import {
  ChevronRightIcon,
  TrashIcon,
  DocumentPlusIcon,
  FolderPlusIcon,
} from "@heroicons/react/16/solid";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type Folder = {
  name: string;
  folders?: Folder[];
};

type FolderProps = {
  folder: Folder;
  path: string[];
  onCreate: (path: string[], type: "folder" | "file") => void;
  onDelete: (path: string[]) => void;
};

function FolderItem({ folder, path, onCreate, onDelete }: FolderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isFolder = !!folder.folders;

  const handleCreateFolder = () => {
    onCreate(path, "folder");
    setIsOpen(true);
  };

  const handleCreateFile = () => {
    onCreate(path, "file");
    setIsOpen(true);
  };

  const handleDelete = () => {
    onDelete(path);
  };

  return (
    <li className="my-1.5" key={folder.name}>
      <span className="flex items-center gap-1.5">
        {isFolder && folder.folders && folder.folders.length > 0 && (
          <button onClick={() => setIsOpen((p) => !p)}>
            <ChevronRightIcon
              className={`size-4 transition-transform ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </button>
        )}

        {isFolder ? (
          <FolderIcon
            className={`size-6 ${
              folder.folders?.length === 0 ? "ml-[22px]" : ""
            }`}
          />
        ) : (
          <DocumentIcon className="ml-[22px] size-6" />
        )}

        <span className="flex-1">{folder.name}</span>

        <div className="flex gap-1 ml-auto">
          {isFolder && (
            <>
              <button onClick={handleCreateFolder} title="New folder">
                <FolderPlusIcon className="size-4" />
              </button>
              <button onClick={handleCreateFile} title="New file">
                <DocumentPlusIcon className="size-4" />
              </button>
            </>
          )}
          <button onClick={handleDelete} title="Delete">
            <TrashIcon className="size-4" />
          </button>
        </div>
      </span>

      {isFolder && isOpen && folder.folders && (
        <ul className="pl-6">
          {folder.folders.map((child) => (
            <FolderItem
              key={child.name}
              folder={child}
              path={[...path, child.name]}
              onCreate={onCreate}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const initialData: Folder[] = [
  {
    name: "Home",
    folders: [
      {
        name: "Movies",
        folders: [
          {
            name: "Action",
            folders: [
              {
                name: "2000s",
                folders: [
                  { name: "Gladiators.mp4" },
                  { name: "A-Beautiful-Mind.mp4" },
                ],
              },
            ],
          },
        ],
      },
      { name: "Documents", folders: [] },
      { name: "Passwords.txt" },
    ],
  },
];

function FileTree() {
  const [folders, setFolders] = useState<Folder[]>(initialData);

  const handleCreate = (path: string[], type: "folder" | "file") => {
    const name = prompt(`Enter ${type} name:`)?.trim();
    if (!name) return;

    const addItem = (items: Folder[], currentPath: string[]): Folder[] =>
      items.map((item) => {
        if (item.name === currentPath[0]) {
          if (currentPath.length === 1) {
            if (!item.folders) item.folders = [];
            const exists = item.folders.some((f) => f.name === name);
            if (exists) {
              alert(`${type} with this name already exists.`);
              return item;
            }
            item.folders.push(
              type === "folder" ? { name, folders: [] } : { name }
            );
          } else if (item.folders) {
            item.folders = addItem(item.folders, currentPath.slice(1));
          }
        }
        return { ...item };
      });

    setFolders(addItem(folders, path));
  };

  const handleDelete = (path: string[]) => {
    const confirmDelete = confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    const deleteItem = (items: Folder[], currentPath: string[]): Folder[] => {
      if (currentPath.length === 1) {
        return items.filter((f) => f.name !== currentPath[0]);
      }
      return items.map((f) => {
        if (f.name === currentPath[0] && f.folders) {
          f.folders = deleteItem(f.folders, currentPath.slice(1));
        }
        return { ...f };
      });
    };

    setFolders(deleteItem(folders, path));
  };

  return (
    <div className="p-8 max-w-md">
      <ul className="pl-6">
        {folders.map((folder) => (
          <FolderItem
            key={folder.name}
            folder={folder}
            path={[folder.name]}
            onCreate={handleCreate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default FileTree;
