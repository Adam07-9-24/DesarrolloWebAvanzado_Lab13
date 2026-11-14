import Image from "next/image";

function initials(name?: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function UserAvatar({
  name,
  image,
  size = "md",
}: {
  name?: string | null;
  image?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const classes = {
    sm: "size-10 text-xs",
    md: "size-12 text-sm",
    lg: "size-24 text-xl",
  }[size];
  const pixels = { sm: 40, md: 48, lg: 96 }[size];

  return (
    <div
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-teal-200 to-cyan-100 font-bold text-slate-700 ring-4 ring-white ${classes}`}
    >
      {image ? (
        <Image
          src={image}
          alt={name ? `Fotografía de ${name}` : "Fotografía de perfil"}
          width={pixels}
          height={pixels}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        initials(name)
      )}
    </div>
  );
}
