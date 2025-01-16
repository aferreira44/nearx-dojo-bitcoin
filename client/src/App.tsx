import { useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_LATEST_BLOCKS, GET_BALANCE, GET_TRANSACTION } from './graphql/queries';
import { Block, LatestBlocksResponse } from './types/graphql';
import "./App.css";

function App() {
  const [searchAddress, setSearchAddress] = useState("");
  const [searchTxId, setSearchTxId] = useState("");
  
  const { loading, error, data } = useQuery<{getLatestBlocks: LatestBlocksResponse}>(GET_LATEST_BLOCKS, {
  variables: { count: 10 },
  pollInterval: 5000,
  });

  // Loading state
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  // Error state
  if (error) {
    return <div className="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Error loading blocks: {error.message}</span>
    </div>;
  }

  const blocks = data?.getLatestBlocks?.blocks || [];

  const handleAddressSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement address search
  };

  const handleTransactionSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement transaction search
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost text-xl">Hoag!</a>
        <div className="flex-1"></div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <div className="flex items-center gap-2">
              <div className="badge badge-success badge-sm animate-pulse text-white">
                Live
              </div>
              <input
                type="text"
                placeholder="Search anything..."
                className="input input-bordered input-sm w-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="main p-4">
        {/* Hero */}
        <div className="hero bg-base-200 min-h-48 rounded-lg p-8">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold">Hoag!</h1>
              <p className="py-6">
                Hoag is a blockchain explorer that allows you to explore the
                blockchain and see the latest blocks, transactions, and address
                balances.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        {/* Blocks */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-left">Blocks (Latest 10)</h2>

          <div className="mt-2 flex justify-center">
            <ul className="timeline mt-10">
              {blocks.map((block, index) => (
                <li key={block.hash}>
                  {index !== 0 && <hr />}
                  <div className="timeline-start timeline-box">
                    <div className="text-sm">
                      <a
                        className="hover:underline hover:text-secondary"
                        href={`/block/${block.height}`}
                      >
                        Block #{block.height}
                      </a>
                      <div className="text-xs opacity-70">
                        Txs: {block.nTx} • Size: {block.size}
                      </div>
                    </div>
                  </div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {index !== blocks.length - 1 && <hr />}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Transactions */}
        <section>
          <h2 className="text-xl font-bold text-left">Transactions</h2>

          <div className="mt-4">
            <form onSubmit={handleTransactionSearch} className="form-control">
              <div className="input-group">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Type the transaction hash"
                    value={searchTxId}
                    onChange={(e) => setSearchTxId(e.target.value)}
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-sm mt-2">Search</button>
            </form>
          </div>
        </section>

        {/* Wallets */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-left">Address Balance</h2>

          <div className="mt-4">
            <form onSubmit={handleAddressSearch} className="form-control">
              <div className="input-group">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Type the address"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-sm mt-2">Search</button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;

// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [blocks, _] = useState([
//     {
//       id: 878413,
//       hash: "0000000000000000000000000000000000000000000000000000000000000000",
//       height: 1,
//       timestamp: 1609458000,
//       transactions: 1,
//     },
//     {
//       id: 878412,
//       hash: "0000000000000000000000000000000000000000000000000000000000000000",
//       height: 2,
//       timestamp: 1609458000,
//       transactions: 1,
//     },
//     {
//       id: 878411,
//       hash: "0000000000000000000000000000000000000000000000000000000000000000",
//       height: 3,
//       timestamp: 1609458000,
//       transactions: 1,
//     },
//     {
//       id: 878410,
//       hash: "0000000000000000000000000000000000000000000000000000000000000000",
//       height: 4,
//       timestamp: 1609458000,
//       transactions: 1,
//     },
//     {
//       id: 878409,
//       hash: "0000000000000000000000000000000000000000000000000000000000000000",
//       height: 5,
//       timestamp: 1609458000,
//       transactions: 1,
//     },
//     {
//       id: 878408,
//       hash: "0000000000000000000000000000000000000000000000000000000000000000",
//       height: 6,
//       timestamp: 1609458000,
//       transactions: 1,
//     },
//     {
//       id: 878407,
//       hash: "0000000000000000000000000000000000000000000000000000000000000000",
//       height: 7,
//       timestamp: 1609458000,
//       transactions: 1,
//     },
//     {
//       id: 878406,
//       hash: "0000000000000000000000000000000000000000000000000000000000000000",
//       height: 8,
//       timestamp: 1609458000,
//       transactions: 1,
//     },
//     {
//       id: 878405,
//       hash: "0000000000000000000000000000000000000000000000000000000000000000",
//       height: 9,
//       timestamp: 1609458000,
//       transactions: 1,
//     },
//     {
//       id: 878404,
//       hash: "0000000000000000000000000000000000000000000000000000000000000000",
//       height: 10,
//       timestamp: 1609458000,
//       transactions: 1,
//     },
//   ]);

//   return (
//     <>
//       {/* Navbar */}
//       <div className="navbar bg-base-100">
//         <a className="btn btn-ghost text-xl">Hoag!</a>
//         <div className="flex-1"></div>
//         <div className="flex-none gap-2">
//           <div className="form-control">
//             <div className="flex items-center gap-2">
//               <div className="badge badge-success badge-sm animate-pulse text-white">
//                 Live
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search anything..."
//                 className="input input-bordered input-sm w-48"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main */}
//       <div className="main p-4">
//         {/* Hero */}
//         <div className="hero bg-base-200 min-h-48 rounded-lg p-8">
//           <div className="hero-content text-center">
//             <div className="max-w-lg">
//               <h1 className="text-5xl font-bold">Hoag!</h1>
//               <p className="py-6">
//                 Hoag is a blockchain explorer that allows you to explore the
//                 blockchain and see the latest blocks, transactions, and address
//                 balances.
//               </p>
//               <button className="btn btn-primary">Get Started</button>
//             </div>
//           </div>
//         </div>

//         {/* Blocks */}
//         <section className="mt-8">
//           <h2 className="text-xl font-bold text-left">Blocks (Latest 10)</h2>

//           <div className="mt-2 flex justify-center">
//             <ul className="timeline mt-10">
//               {blocks.map((block, index) => (
//                 <li key={block.id}>
//                   {index !== 0 && <hr />}
//                   <div className="timeline-start timeline-box">
//                     <a
//                       className="hover:underline hover:text-secondary"
//                       href={`/block/${block.id}`}
//                     >
//                       {block.id}
//                     </a>
//                   </div>
//                   <div className="timeline-middle">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                       className="h-5 w-5"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   {index !== blocks.length - 1 && <hr />}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>

//         {/* Transactions */}
//         <section>
//           <h2 className="text-xl font-bold text-left">Transactions</h2>

//           <div className="mt-4">
//             <div className="form-control">
//               <div className="input-group">
//                 <label className="input input-bordered flex items-center gap-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 16 16"
//                     fill="currentColor"
//                     className="h-4 w-4 opacity-70"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <input
//                     type="text"
//                     className="grow"
//                     placeholder="Type the transaction hash"
//                   />
//                 </label>
//               </div>
//               <button className="btn btn-primary btn-sm mt-2">Search</button>
//             </div>
//           </div>
//         </section>

//         {/* Wallets */}
//         <section className="mt-8">
//           <h2 className="text-xl font-bold text-left">Address Balance</h2>

//           <div className="mt-4">
//             <div className="form-control">
//               <div className="input-group">
//                 <label className="input input-bordered flex items-center gap-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 16 16"
//                     fill="currentColor"
//                     className="h-4 w-4 opacity-70"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <input
//                     type="text"
//                     className="grow"
//                     placeholder="Type the address"
//                   />
//                 </label>
//               </div>
//               <button className="btn btn-primary btn-sm mt-2">Search</button>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

// export default App;
