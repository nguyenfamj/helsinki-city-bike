import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// // Type setup
// type header = {
//   idx: number;
//   title: string;
//   related_to: keyof typeof journeyRow | keyof typeof stationRow;
//   align: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
// };

// interface journeyRow {
//   fid: number;
//   departure_time: string;
//   departure_station_id: number;
//   departure_station_name: string;
//   return_time: string;
//   return_station_id: number;
//   return_station_name: string;
//   covered_distance: number;
//   duration: number;
// }

// interface stationRow {
//   station_id: number;
//   fi_name: string;
//   se_name: string;
//   en_name: string;
//   fi_address: string;
//   se_address: string;
//   fi_city: string;
//   se_city: string;
//   operator_name: string;
//   capacity: number;
//   longitude: string;
//   latitude: string;
// }

// interface dataTableProps {
//   headers: header[];
//   rows: journeyRow[] | stationRow[];
// }

// const DataTable = ({ headers, rows }: dataTableProps) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label='simple table'>
//         <TableHead>
//           <TableRow>
//             {headers.map((header) => (
//               <TableCell key={header.idx} align={header.align}>
//                 {header.title}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//               {headers.map((header) => (
//                 <TableCell key={header.idx} align={header.align}>
//                   {row[header.related_to]}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default DataTable;
