import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
  const {
    user: { fullName, username, userId }
  } = useUser();

  return (
    <div className="p-4">
      <User username={username} fullname={fullName} />
      {/* Suggestions need userId so we know who we're already following */}
      <Suggestions userId={userId} />
    </div>
  );
}
