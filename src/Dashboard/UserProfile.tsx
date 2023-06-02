import React, {useState, useEffect} from "react";
import axios from "axios";

interface UserProfileProps {
  userId: number;
  name: string;
  email: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({userId}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://206.189.91.54/api/v1/users");
        const userData = response.data.find((user: User) => user.id === userId);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default UserProfile;
