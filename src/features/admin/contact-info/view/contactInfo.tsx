import React, { useState, useEffect } from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useContactInfo, useContactInfoCreation } from "../hooks/useContactInfo";
import { ContactInfoModel } from "../model/contactInfo";

const ContactInfoView: React.FC = () => {
  const { data: contactsData, isLoading } = useContactInfo();
  const mutation = useContactInfoCreation();

  const [activeTab, setActiveTab] = useState<"list" | "batch">("list");
  const [batchItems, setBatchItems] = useState<ContactInfoModel[]>([]);

  const list = contactsData?.data || [];

  // Populate batch edit items when data arrives or when switching to batch mode
  useEffect(() => {
    if (list.length > 0) {
      setBatchItems(JSON.parse(JSON.stringify(list))); // deep clone
    }
  }, [contactsData, activeTab]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this contact configuration?");
    if (!confirm) return;
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const handleBatchChange = (index: number, field: keyof ContactInfoModel, value: string) => {
    setBatchItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddBatchItem = () => {
    setBatchItems((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        key: "",
        value: "",
        group: "general",
      },
    ]);
  };

  const handleRemoveBatchItem = (index: number) => {
    setBatchItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveBatch = async () => {
    // Validate keys and values are not empty
    const isValid = batchItems.every((item) => item.key.trim() && item.value.trim() && item.group.trim());
    if (!isValid || batchItems.length === 0) {
      alert("All fields (Key, Value, Group) are required for all batch items");
      return;
    }

    // Map items, remove temporary client-side IDs for new items so backend knows to insert them
    const payload = batchItems.map((item) => {
      if (item.id.startsWith("new-")) {
        return { key: item.key.trim(), value: item.value.trim(), group: item.group.trim() } as unknown as ContactInfoModel;
      }
      return { id: item.id, key: item.key.trim(), value: item.value.trim(), group: item.group.trim() };
    });

    await mutation.mutateAsync({
      type: "batch",
      batchData: payload,
    });
    setActiveTab("list");
  };

  // Group items by their group field for display
  const groupedContacts = list.reduce<Record<string, ContactInfoModel[]>>((acc, item) => {
    const groupName = item.group || "general";
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(item);
    return acc;
  }, {});

  return (
    <>
      <AdminNavbar layout="Contact Info" page="Contact Configurations" showBackButton={false} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <PageLayout
          action={{
            show: activeTab === "list",
            buttonTitle: "Create Contact",
            link: { to: "/admin/contact-info/create" },
          }}
          title="Dynamic Contact Info"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("list")}
              className={`py-2.5 px-5 font-semibold text-sm transition-all duration-200 ${
                activeTab === "list"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Grouped Configurations
            </button>
            <button
              onClick={() => setActiveTab("batch")}
              className={`py-2.5 px-5 font-semibold text-sm transition-all duration-200 ${
                activeTab === "batch"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Batch Upsert Editor
            </button>
          </div>

          {isLoading ? (
            <SimpleLoadingTable isTable={false} />
          ) : activeTab === "list" ? (
            /* Tab 1: Grouped Configurations View */
            Object.keys(groupedContacts).length === 0 ? (
              <EmptyData title="Contacts" action />
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedContacts).map(([groupName, items]) => (
                  <div key={groupName} className="border border-gray-150 rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-5 py-3 border-b border-gray-150 flex justify-between items-center">
                      <span className="font-bold text-xs uppercase text-gray-700 tracking-wider">
                        {groupName.replace(/_/g, " ")}
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                        {items.length} Configs
                      </span>
                    </div>
                    <Table>
                      <TableHead field={["Key", "Value", "Action"]} />
                      <TableBody>
                        {items.map((item, idx) => (
                          <tr key={item.id} className={idx !== items.length - 1 ? "border-b border-blue-gray-50" : ""}>
                            <td className="py-3 px-5">
                              <Typography variant="small" color="blue-gray" className="font-semibold">
                                {item.key}
                              </Typography>
                            </td>
                            <td className="py-3 px-5 max-w-sm truncate">
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {item.value}
                              </Typography>
                            </td>
                            <td className="py-3 px-5">
                              <div className="flex items-center gap-3">
                                <Link to={`/admin/contact-info/edit/${item.id}`}>
                                  <Typography as="span" className="text-xs font-semibold text-yellow-900 hover:underline cursor-pointer">
                                    Edit
                                  </Typography>
                                </Link>
                                <Typography
                                  as="button"
                                  className="text-xs font-semibold text-red-600 hover:text-red-800 hover:underline transition-colors"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Delete
                                </Typography>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Tab 2: Batch Editor View */
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <Typography className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Bulk Configuration Rows
                </Typography>
                <Button type="button" size="sm" variant="outlined" onClick={handleAddBatchItem} disabled={mutation.isPending}>
                  + Add Row
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full min-w-[640px] table-auto">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-600">Group</th>
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-600">Key Name</th>
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase text-gray-600">Value</th>
                      <th className="py-3 px-4 text-center text-xs font-bold uppercase text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    {batchItems.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-gray-500 text-sm">
                          No items in batch editor. Click "Add Row" to start.
                        </td>
                      </tr>
                    ) : (
                      batchItems.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="p-3">
                            <input
                              type="text"
                              value={item.group}
                              placeholder="e.g. social_media"
                              onChange={(e) => handleBatchChange(idx, "group", e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-blue-500"
                              disabled={mutation.isPending}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={item.key}
                              placeholder="e.g. instagram"
                              onChange={(e) => handleBatchChange(idx, "key", e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-blue-500"
                              disabled={mutation.isPending}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={item.value}
                              placeholder="Value URL/Text"
                              onChange={(e) => handleBatchChange(idx, "value", e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-blue-500"
                              disabled={mutation.isPending}
                            />
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveBatchItem(idx)}
                              className="text-xs text-red-500 hover:text-red-700 font-semibold"
                              disabled={mutation.isPending}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-150">
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (window.confirm("Cancel batch editing and lose changes?")) {
                      setActiveTab("list");
                    }
                  }}
                  disabled={mutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  color="blue"
                  onClick={handleSaveBatch}
                  disabled={mutation.isPending || batchItems.length === 0}
                  className="text-white"
                >
                  {mutation.isPending ? "Saving Batch..." : "Save Batch (Upsert)"}
                </Button>
              </div>
            </div>
          )}
        </PageLayout>
      </div>
    </>
  );
};

export default ContactInfoView;
