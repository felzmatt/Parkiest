import { minidenticon } from "minidenticons";
import { Link } from "react-router-dom";

function ProfilePicture({ username, mail, size = 150, borderWidth = 0.5 }) {
  const svg = minidenticon("${mail || 'test@email.com'} ${username || 'test'}");
  return (
    <Link
      to="/profile"
      style={{
        width: size,
        height: size,
        padding: borderWidth,
        background: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </Link>
  );
}
export default ProfilePicture;
