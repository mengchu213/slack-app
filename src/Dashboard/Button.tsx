import { getMessages, getUserss } from "../utils/api";

const Button: React.FC = () => {
  const handleClick = async () => {
    const authData = JSON.parse(localStorage.getItem("auth") || "{}");
    const { "access-token": accessToken, client, expiry, uid } = authData;
    const headers = {
      "access-token": accessToken,
      client: client,
      expiry: expiry,
      uid: uid
    };

    try {
      const userListResponse = await getUserss(headers);
      const userList = userListResponse.data;
      const messages: any[] = [];
      const maxConcurrentRequests = 100;
      let promisePool = [];
      let receiverId;

      const email = JSON.parse(localStorage.getItem("auth") || "{}").uid;
      const matchingUser = userList.find(user => user.uid === email);
      if (matchingUser) {
        receiverId = matchingUser.id;
        localStorage.setItem('currentUser', receiverId)
      }

      for (let current = 0; current < userList.length; current++) {
        if (userList[current].id !== receiverId) {
          const promise = getMessages(userList[current].id, "User", headers);
          promisePool.push(promise);

          if (promisePool.length >= maxConcurrentRequests || current === userList.length - 1) {
            const messagesResponse = await Promise.all(promisePool);
            messages.push(...messagesResponse);

            promisePool = [];
          }
        }
      }

      const currentUserId: string = localStorage.currentUser || "";
      const filteredMessages = messages
        .filter(item => item.data.some((msg: { sender: any; receiver: any; }) => {
          const { sender, receiver } = msg;
          const isSenderOrReceiverCurrentUser =
            sender.id === currentUserId || receiver.id === currentUserId;
          return !isSenderOrReceiverCurrentUser;
        }))
        .map(item => item.data[0])
        .map(msg => {
          const { sender, receiver } = msg;
          const recipient = sender.id === currentUserId ? receiver : sender;
          return {
            id: recipient.id,
            uid: recipient.uid
          };
        });

      const userListsArray = filteredMessages.reduce((acc: any[], msg: any) => {
        const index = acc.findIndex((userList: any[]) => userList.length > 0 && userList[0].id === msg.id);
        if (index === -1) {
          acc.push([{ id: msg.id, uid: msg.uid }]);
        } else {
          acc[index].push({ id: msg.id, uid: msg.uid });
        }
        return acc;
      }, []);

      localStorage.setItem(currentUserId, JSON.stringify({ userLists: userListsArray }));
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

export default Button;
