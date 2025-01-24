"use client";

interface SelectedMembersDisplayProps {
  selectedMembers: string[]; // selectedMembers 타입을 string[]으로 변경
  members: { id: string; name: string }[];
  toggleMember: (id: string) => void; // toggleMember에서 id를 string으로 변경
}

export default function SelectedMembersDisplay({
  selectedMembers,
  members,
  toggleMember,
}: SelectedMembersDisplayProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {selectedMembers.map((id) => {
        const member = members.find((m) => m.id === id);
        return (
          <div
            key={id}
            className="flex items-center bg-wooahBlue text-sm px-2 py-1 rounded-full"
          >
            {member?.name}
            <button
              className="ml-2 text-gray-500"
              onClick={() => toggleMember(id)}
            >
              ✕
            </button>
          </div>
        );
      })}
      <hr className="w-full mt-4 text-gray-400" />
    </div>
  );
}
