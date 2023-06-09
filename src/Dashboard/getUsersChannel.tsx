import { getUsersChannels } from "../utils/api";

interface GetUserChannelButtonProps {
    headers?: any;
}

export const GetUserChannelButton = ({ headers = {} }: GetUserChannelButtonProps) => {
    const handleClick = async () => {
        try {
            const channelList = await getUsersChannels(headers);
            const currentUserId: string = localStorage.currentUser || "";
            let userData = JSON.parse(localStorage.getItem(currentUserId) || '{}');
            userData.channelLists = userData.channelLists || [];
            for (let i = 0; i < channelList.data.length; i++) {
                userData.channelLists[i] = userData.channelLists[i] || [];
                userData.channelLists[i][0] = channelList.data[i];
            }
            localStorage.setItem(currentUserId, JSON.stringify(userData));
            window.location.reload();
        } catch (error) {
            console.error(error);
        }

    };


    return (
        <button
            onClick={handleClick}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 "
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </button>
    );
};  
