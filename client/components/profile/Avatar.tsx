import AvatarImage from "../ui/avatar/AvatarImage";
import AvatarFallback from "../ui/avatar/AvatarFallback";

type AvatarProps = {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "away";
};

const Avatar_: React.FC<AvatarProps> = ({
  src,
  alt = "",
  size = "md",
  status,
}) => {
  return (
    <div className="relative inline-block cursor-pointer">
      <AvatarImage {...{ src, alt, size }} />
      <AvatarFallback size={size} status={status} />
    </div>
  );
};

export default Avatar_;
