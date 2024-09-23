import { Avatar } from "@mui/joy";

const UserAvatar = ({ user }) => {
  const userInitial = user.displayName.charAt(0);

  return (
    <>
      {user.photoURL ? (
        <Avatar className='avatar' src={user.photoURL} />
      ) : (
        <Avatar variant='soft' className='avatar' color='danger'>
          {userInitial}
        </Avatar>
      )}
    </>
  );
};

export default UserAvatar;
