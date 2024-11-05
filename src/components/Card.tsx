import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const colorClasses: { [key: string]: string } = {
  blue: "from-blue-700",
  red: "from-red-700",
  lime: "from-lime-700",
  orange: "from-orange-700",
  purple: "from-purple-700",
  pink: "from-pink-700",
  teal: "from-teal-700",
  yellow: "from-yellow-700",
  green: "from-green-700",
};

const secondaryColorClasses: { [key: string]: string } = {
  blue: "to-blue-800",
  red: "to-red-800",
  lime: "to-lime-800",
  orange: "to-orange-800",
  purple: "to-purple-800",
  pink: "to-pink-800",
  teal: "to-teal-800",
  yellow: "to-yellow-800",
  green: "to-green-800",
};

const Card = ({ id, title, artist, cover, onPlay }) => {
  const [color, setColor] = useState<string>("");
  const [secondaryColor, setSecondaryColor] = useState<string>("");

  const [onHover, setOnHover] = useState<boolean>(false);

  useEffect(() => {
    const colors = Object.keys(colorClasses);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomSecondaryColor =
      colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
    setSecondaryColor(randomSecondaryColor);
  }, []);

  return (
    color !== "" && (
      <div
        className="flex flex-col gap-1 transition transition-colors hover:bg-zinc-900 px-3 py-2 rounded-md hover:cursor-pointer"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <div className="relative min-w-48 max-w-48 h-48 bg-zinc-900 rounded-lg">
          <img
            src={cover}
            alt={`${title} cover`}
            className="w-full h-full object-cover rounded-lg"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: onHover ? 1 : 0, y: onHover ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              onPlay(id);
            }}
            className="absolute right-0 bottom-0 w-42 h-42 transition transition-colors bg-purple-600 p-3 mx-2 my-3 flex items-center justify-center rounded-full hover:bg-purple-700 hover:cursor-pointer"
          >
            <Play size={22} color="white" fill="white" />
          </motion.div>
        </div>
        <p className="text-md font-semibold text-wrap">{title}</p>
        <p className="text-xs text-gray-500">{artist}</p>
      </div>
    )
  );
};

export default Card;
