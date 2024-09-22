interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="border-b border-slate-200  pb-4">
      <div className="flex pl-2 mt-2">
        <Avatar name={authorName} />
        <div className="flex justify-center flex-col font-extralight pl-2">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
          <Circle />
        </div>
        <div className="pl-2 font-thin">{publishedDate}</div>
      </div>
      <div className="text-xl font-semibold  mt-3 p-2">{title}</div>
      <div className="text-md  font-thin pl-2">{content.slice(0, 45) + ".... "}</div>
      <div className="to-slate-400 font-extralight text-sm pl-2">{`${Math.ceil(
        content.length / 100
      )} minute(s) read `}</div>
    </div>
  );
};

function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-xs text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}

function Circle(){
    return (
        <div className="bg-slate-500 h-1 w-1 rounded-full"></div>
    )
}