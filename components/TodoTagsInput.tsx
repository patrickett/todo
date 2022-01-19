import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { X } from "react-bootstrap-icons";

interface TagsInputProps {
  tagError: string | null;
  setTagError: Dispatch<SetStateAction<string | null>>;
  tagList: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export default function TagsInput({
  setTags,
  setTagError,
  tagList,
  tagError,
}: TagsInputProps) {
  const [tagValue, setTagValue] = useState<string>("");

  const removeTags = (removeIndex: number) => {
    setTags([...tagList.filter((_, index) => index !== removeIndex)]);
  };

  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (tagValue !== "") {
      if (tagList.includes(tagValue)) {
        // tag already exists
        setTagError("You cannot add duplicate tags");
        setTagValue("");
        return;
      }
      setTagError(null);
      setTags([...tagList, tagValue]);
      setTagValue("");
    }
  };

  const updateTagValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTagValue(event.target.value);
  };

  return (
    <div>
      <input
        value={tagValue}
        onChange={updateTagValue}
        className={`appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight ${
          tagError
            ? "border-red-400 focus:border-red-400 focus:ring-red-400"
            : ""
        } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
      />
      {tagError ? (
        <span className="text-xs text-red-400 text-center">{tagError}</span>
      ) : null}
      <div className="w-full flex items-start flex-wrap min-h-3">
        <ul className="flex flex-wrap p-0 py-2">
          {tagList.map((tag, index) => (
            <li
              key={index}
              className="tag w-auto h-8 flex items-center text-white pl-2 list-none  bg-blue-600 rounded mr-2 mt-2"
            >
              <span className="text-sm text-center">{tag}</span>
              <span
                className=" tag-close-icon block w-4 h-4 leading-4 text-center m-2 rounded text-white cursor-pointer "
                onClick={() => removeTags(index)}
              >
                <X />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
