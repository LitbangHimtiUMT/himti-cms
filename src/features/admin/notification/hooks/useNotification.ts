import { ApiResponse } from "@core/libs/api/types"
import { NotificationBodyRequest } from "@core/model/notification"
import { notificationService } from "@core/services/notification"
import { SendAllState, SendOneState } from "@features/admin/user-login/store/ModalNotificationState"
import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { toast } from "react-toastify"

interface MutationVariabel {
    type: "ALL" | "SINGLE"
    data: NotificationBodyRequest
}

export const useNotificationCreation = () => {
    const setAll = useSetAtom(SendAllState)
    const setSingle = useSetAtom(SendOneState)
    const mutation = useMutation({
        mutationFn: ({ type, data }: MutationVariabel) => {
            switch (type) {
                case "ALL":
                    return notificationService.sendAll(data)
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
            setAll(prev => !prev)
            setSingle(prev => !prev)
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