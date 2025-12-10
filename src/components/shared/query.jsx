import Markdown from "react-markdown";
import { FaSpinner } from "react-icons/fa";
import { HiOutlineCursorArrowRipple } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

export function Query({
  handleSubmit,
  message,
  input,
  handleChange,
  isLoading = false,
}) {
  const { t } = useTranslation();
  return (
    <aside className="flex-1 min-h-0 flex flex-col border-t border-border">
      <div className="flex-1 min-h-0 p-4 overflow-y-auto scrollbar-thumb-[h-1] scrollbar-track-gray-700">
        {message.map((itm, index) => (
          <Message key={index} texte={itm} />
        ))}
      </div>

      <div className="h-[52px] px-4 pb-4">
        <form
          onSubmit={handleSubmit}
          className="flex justify-between border-[#506efa] border-2 border-solid rounded-full p-2 outline-none"
        >
          <input
            type="text"
            placeholder={t("ai.text1")}
            className="flex-grow rounded-l-full pl-3 text-sm bg-white outline-none"
            value={input}
            onChange={handleChange}
            disabled={isLoading}
          />
          {isLoading ? (
            <button type="button" className="cursor-not-allowed rounded-r-full">
              <FaSpinner className="spin" size={25} color="#506efa" />
            </button>
          ) : (
            <button type="submit" className="cursor-pointer rounded-r-full">
              <HiOutlineCursorArrowRipple size={25} color="#506efa" />
            </button>
          )}
        </form>
      </div>
    </aside>
  );
}

const Message = ({ texte }) => {
  return (
    <div
      className={`${texte.user == "ai" ? " chat chat-start" : "chat chat-end"}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={`${
              texte.user == "ai"
                ? "https://cdn-icons-png.flaticon.com/512/786/786153.png"
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }`}
          />
        </div>
      </div>
      <div
        className={`${
          texte.user == "me"
            ? "bg-[#506efa] text-white chat-bubble text-sm"
            : "bg-[#d0d9fa] text-black  chat-bubble text-sm"
        }`}
      >
        <Markdown>{texte.msg}</Markdown>
      </div>
    </div>
  );
};
