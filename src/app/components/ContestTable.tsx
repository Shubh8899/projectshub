// "use client";
// import React from "react";
// import { Contest } from "../../types/contest";

// const ContestsList = ({
//   platformName,
//   data,
// }: {
//   platformName: string;
//   data: {
//     data: Contest[];
//     isLoading: boolean;
//     isError: boolean;
//     isSuccessful: boolean;
//     message: string;
//   };
// }) => {
//   const { isLoading, isError, isSuccessful, data: contestsData } = data;

//   const getCurrentTimestamp = () => Date.now();

//   const isContestOngoing = (contest: Contest) => {
//     const startTime = new Date(contest.start_time).getTime();
//     const endTime = new Date(contest.end_time).getTime();
//     const currentTime = getCurrentTimestamp();
//     return startTime <= currentTime && currentTime <= endTime;
//   };

//   const isContestUpcoming = (contest: Contest) => {
//     const startTime = new Date(contest.start_time).getTime();
//     const currentTime = getCurrentTimestamp();
//     return startTime > currentTime;
//   };

//   const randomString = () => Math.random().toString(36).substring(7);

//   if (isError) {
//     return <div>Error: {data.message}</div>;
//   }
//   return (
//     <div className="my-8 ">
//       <h2 className="text-2xl font-bold">{platformName} Contests</h2>
//       {contestsData.length > 0 && !isLoading && (
//         <div className="text-sm text-gray-500">
//           {contestsData.length} {platformName} contests found.
//         </div>
//       )}
//       {isLoading && ShimmerEffect()}
//       <div className="overflow-x-auto ">
//         <table className="w-full shadow-lg border-collapse mt-4">
//           <tbody>
//             {contestsData.map((contest: Contest) => (
//               <tr
//                 key={contest.name + randomString()}
//                 className={`${
//                   isContestOngoing(contest)
//                     ? "bg-green-100"
//                     : isContestUpcoming(contest)
//                     ? "bg-yellow-100"
//                     : "bg-red-100"
//                 }`}
//               >
//                 <td className="py-2 px-4 border border-gray-300">
//                   <a
//                     href={contest.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`text-sm font-bold ${
//                       isContestOngoing(contest)
//                         ? "text-green-600"
//                         : isContestUpcoming(contest)
//                         ? "text-yellow-600"
//                         : "text-red-600"
//                     } hover:underline`}
//                   >
//                     {contest.name}
//                   </a>
//                   <div className="text-sm">
//                     {new Date(contest.start_time).toLocaleString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                       year: "numeric",
//                       hour: "numeric",
//                       minute: "numeric",
//                       hour12: true,
//                     })}
//                     <br />
//                     {new Date(contest.end_time).toLocaleString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                       year: "numeric",
//                       hour: "numeric",
//                       minute: "numeric",
//                       hour12: true,
//                     })}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const ShimmerEffect = () => {
//   return (
//     <div className="animate-pulse">
//       <div className="flex space-x-4">
//         <div className="flex-1 space-y-4 py-1">
//           <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//           <div className="space-y-2">
//             <div className="h-4 bg-gray-300 rounded"></div>
//             <div className="h-4 bg-gray-300 rounded w-5/6"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContestsList;

"use client";
import React from "react";
import { Contest } from "../../types/contest";

const formatDate = (timestamp: any) => {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const ContestRow = ({ contest }: { contest: Contest }) => {
  const isContestOngoing = () => {
    const startTime = new Date(contest.start_time).getTime();
    const endTime = new Date(contest.end_time).getTime();
    const currentTime = Date.now();
    return startTime <= currentTime && currentTime <= endTime;
  };

  const isContestUpcoming = () => {
    const startTime = new Date(contest.start_time).getTime();
    const currentTime = Date.now();
    return startTime > currentTime;
  };

  const getRowClass = () => {
    if (isContestOngoing()) return "bg-green-100";
    if (isContestUpcoming()) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <tr
      className={getRowClass()}
      key={contest.url}
      style={{
        transition: "all .15s ease",
      }}
    >
      <td className="py-2 px-4 border-separate rounded-lg">
        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm font-bold ${
            isContestOngoing()
              ? "text-green-600"
              : isContestUpcoming()
              ? "text-yellow-600"
              : "text-red-600"
          } hover:underline`}
        >
          {contest.name}
        </a>
        <div className="text-sm">
          {formatDate(contest.start_time)} <br />
          {formatDate(contest.end_time)}
        </div>
      </td>
    </tr>
  );
};

const ContestsList = ({
  platformName,
  data,
}: {
  platformName: string;
  data: {
    data: Contest[];
    isLoading: boolean;
    isError: boolean;
    isSuccessful: boolean;
    message: string;
  };
}) => {
  const { isLoading, isError, data: contestsData, message } = data;

  if (isError) {
    return <div>Error: {message}</div>;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold">{platformName} Contests</h2>
      {contestsData.length > 0 && !isLoading && (
        <div className="text-sm text-gray-500">
          {contestsData.length} {platformName} contests found.
        </div>
      )}
      {isLoading ? (
        <ShimmerEffect />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg border-none mt-4">
            <tbody>
              {contestsData.map((contest) => (
                <ContestRow key={contest.url} contest={contest} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const ShimmerEffect = () => {
  return (
    <div className="animate-pulse">
      <div className="flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestsList;
