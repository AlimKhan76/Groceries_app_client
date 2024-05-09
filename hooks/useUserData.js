import { useQuery } from "@tanstack/react-query";
import { getUserDataAPI } from "../api/userAPI";

function useUserDataQuery() {
    return useQuery({
        queryKey: ["userData"],
        queryFn: getUserDataAPI,
        staleTime: Infinity,
    })

}

export default useUserDataQuery;
