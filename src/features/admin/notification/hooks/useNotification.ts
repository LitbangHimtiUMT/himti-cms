import { ApiResponse } from "@core/libs/api/types"
import { NotificationBodyRequest } from "@core/model/notification"
import { notificationService } from "@core/services/notification"
import { SendAllState } from "@features/admin/user-login/store/ModalNotificationState"
import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { toast } from "react-toastify"

interface MutationVariabel {
    type: "ALL" | "SINGLE"
    data: NotificationBodyRequest
    id?: string
}

export const useNotificationCreation = () => {
    const [, setState] = useAtom(SendAllState)
    const mutation = useMutation({
        mutationFn: ({ type, data, id }: MutationVariabel) => {
            switch (type) {
                case "ALL":
                    return notificationService.sendAll(data)
                case "SINGLE":
                    return notificationService.sendSingle(data, {
                        path: `fcm/${id}`
                    })
                default:
                    return notificationService.sendAll(data)
            }
        },
        onSuccess: (res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: true,
                theme: "dark",
            });
            setState(prev => ({
                ...prev,
                id: "",
                name: "",
                show: false
            }))
        },
        onError: (err: ApiResponse) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: true,
                theme: "dark",
            });
        },

    })
    return mutation

}