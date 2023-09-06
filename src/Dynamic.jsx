import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './DynamicPDFReport.css';

const DynamicPDFReport = ({ reportData }) => {
  const reportRef = useRef(null);

  const generatePDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pages = reportRef.current.querySelectorAll('.page');

    const canvasPromises = Array.from(pages).map((page) => {
      return html2canvas(page, {
        scale: 1,
        useCORS: true
      });
    });

    Promise.all(canvasPromises).then(canvases => {
      canvases.forEach((canvas, index) => {
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');

        if (index !== 0) {
          pdf.addPage(); // add a new page for subsequent pages
        }
        
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        const date = new Date().toLocaleDateString();

        // Add header and footer for every page
        pdf.setFontSize(12); 
        pdf.setFont("times", "bold"); 
        pdf.setTextColor(40, 40, 40); 
        pdf.text('SecureDapp', 10, 10);
        pdf.text(date, 10, 15); 
        pdf.setDrawColor(0, 128, 0);  
        pdf.line(5, 18, 205, 18); 

        pdf.setDrawColor(0, 128, 0);  
        pdf.line(10, 270, 200, 270);
        pdf.setFontSize(10);
        pdf.setFont("times", "bold");
        pdf.setTextColor(100, 100, 100); 
        pdf.text('SecureDapp', 10, 275);
        pdf.setFont("times", "normal");
        pdf.text('235, 2nd & 3rd Floor, 13th Cross Rd, Indira Nagar II Stage,', 10, 280, null, null, 'left');
        pdf.text('Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038', 10, 285, null, null, 'left');
        pdf.text('securedapp.in', 10, 290, null, null, 'left');
        
        if (index === pages.length - 1) { // check if it's the last page
          pdf.save('report.pdf');
        }
      });
    });
  };

  return (
    <div className="container">
      <div ref={reportRef} className="report-card">
        {/* Page 2: Executive Summary */}
        <div className="page">
          <h1 className="report-title">SecureDApp Solidity Shield Audit Report</h1>
          <h2>Executive Summary</h2>
          <table className="summary-table">
            <tr>
              <th>ID</th>
              <th>Contracts</th>
              <th>Lines</th>
              <th>Assembly Lines</th>
              <th>ERCs</th>
              <th>Findings</th>
              <th>Detectors</th>
            </tr>
            <tr>
              <td>{reportData.id}</td>
              <td>{reportData.contracts}</td>
              <td>{reportData.lines}</td>
              <td>{reportData.assembly_lines}</td>
              <td>{reportData.ercs.join(', ')}</td>
              <td>
                <table className="findings-table">
                  {Object.entries(reportData.findings).map(([key, value], idx) => (
                    <tr key={idx}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </table>
              </td>
              <td>{reportData.detectors}</td>
            </tr>
          </table>
        </div>

        {/* Page 3: Vulnerabilities Found */}
        <div className="page">
          <h2>Vulnerabilities Found</h2>
          {Object.keys(reportData).map((key) => {
            if (["1", "2", "3", "4", "5"].includes(key)) {
              return (
                <div key={key}>
                  <h3>{key}: {["Critical", "Medium", "Low", "Informational", "Optimization"][parseInt(key) - 1]}</h3>
                  <table className="vulnerabilities-table">
                    {Object.entries(reportData[key]).map(([type, locations]) => (
                      <tr key={type}>
                        <td>{type}</td>
                        <td>{locations.join(', ')}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Page 4: Disclaimer and Contact Us */}
        <div className="page">
          <h2>Disclaimer</h2>
          <p>Disclaimer content goes here.</p>
          <h2>Contact Us</h2>
          <p>Contact details and other related information.</p>
        </div>
      </div>

      <button onClick={generatePDF} className="generate-button">
        Generate PDF
      </button>
    </div>
  );
};

export default DynamicPDFReport;


// import React, { useRef } from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import './DynamicPDFReport.css';

// const DynamicPDFReport = ({ reportData }) => {
//   const reportRef = useRef(null);

//   const generatePDF = () => {
//     const pdf = new jsPDF('p', 'mm', 'a4');
    
//     const pages = reportRef.current.querySelectorAll('.page');
//     Array.from(pages).forEach((page, index) => {
//       html2canvas(page, {
//         scale: 1,
//         useCORS: true
//       }).then(canvas => {
//         const imgWidth = 210;  
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         const contentDataURL = canvas.toDataURL('image/png');

//         if (index !== 0) {
//           pdf.addPage(); // add a new page for subsequent pages
//         }
        
//         pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
//         const date= new Date().toLocaleDateString();

//         // Add header and footer for every page
//         pdf.setFontSize(12); 
//         pdf.setFont("times", "bold"); 
//         pdf.setTextColor(40, 40, 40); 
//         pdf.text('SecureDapp', 10, 10);
//         pdf.text(date, 10, 15); 
//         pdf.setDrawColor(0, 128, 0);  
//         pdf.line(5, 18, 250, 18); 

//         pdf.setDrawColor(0, 128, 0);  
//         pdf.line(10, 270, 200, 270);
//         pdf.setFontSize(10);
//         pdf.setFont("times", "bold");
//         pdf.setTextColor(100, 100, 100); 
//         pdf.text('SecureDapp', 10, 275);
//         pdf.setFont("times", "normal");
//         pdf.text('235, 2nd & 3rd Floor, 13th Cross Rd, Indira Nagar II Stage,', 10, 280, null, null, 'left');
//         pdf.text('Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038', 10, 285, null, null, 'left');
//         pdf.text('securedapp.in', 10, 290, null, null, 'left');
        
//         if (index === pages.length - 1) { // check if it's the last page
//           pdf.save('report.pdf');
//         }
//       });
//     });
//   };

//   return (
//     <div className="container">
//       <div ref={reportRef} className="report-card">
//         {/* Page 1: Title Page */}
//         {/* <div className="page">
//           <h1 className="report-title">SecureDApp Solidity Shield Audit Report</h1>
//           <img src={`${process.env.PUBLIC_URL}/headerImage.png`} alt="SecureDApp Logo" className="header-logo" />
//           <div className="page-date">Date: {new Date().toLocaleDateString()}</div>
//         </div> */}

//         {/* Page 2: Executive Summary */}
//         <div className="page">
//           <h1 className="report-title">SecureDApp Solidity Shield Audit Report</h1>
//           <h2>Executive Summary</h2>
//           <table className="summary-table">
//             <tr>
//               <th>ID</th>
//               <th>Contracts</th>
//               <th>Lines</th>
//               <th>Assembly Lines</th>
//               <th>ERCs</th>
//               <th>Findings</th>
//               <th>Detectors</th>
//             </tr>
//             <tr>
//               <td>{reportData.id}</td>
//               <td>{reportData.contracts}</td>
//               <td>{reportData.lines}</td>
//               <td>{reportData.assembly_lines}</td>
//               <td>{reportData.ercs.join(', ')}</td>
//               <td>
//   <table className="findings-table">
//     {Object.entries(reportData.findings).map(([key, value], idx) => (
//       <tr key={idx}>
//         <td>{key}</td>
//         <td>{value}</td>
//       </tr>
//     ))}
//   </table>
// </td>
//               <td>{reportData.detectors}</td>
//             </tr>
//           </table>
//         </div>

//         {/* Page 3: Vulnerabilities Found */}
//         <div className="page">
//           <h2>Vulnerabilities Found</h2>
//           {Object.keys(reportData).map((key) => {
//             if (["1", "2", "3", "4", "5"].includes(key)) {
//               return (
//                 <div key={key}>
//                   <h3>{key}: {["Critical", "Medium", "Low", "Informational", "Optimization"][parseInt(key) - 1]}</h3>
//                   <table className="vulnerabilities-table">
//                     {Object.entries(reportData[key]).map(([type, locations]) => (
//                       <tr key={type}>
//                         <td>{type}</td>
//                         <td>{locations.join(', ')}</td>
//                       </tr>
//                     ))}
//                   </table>
//                 </div>
//               );
//             }
//             return null;
//           })}
//         </div>

//         {/* Page 4: Disclaimer and Contact Us */}
//         <div className="page">
//           <h2>Disclaimer</h2>
//           <p>Disclaimer content goes here.</p>
//           <h2>Contact Us</h2>
//           <p>Contact details and other related information.</p>
//         </div>
//       </div>

//       <button onClick={generatePDF} className="generate-button">
//         Generate PDF
//       </button>
//     </div>
//   );
// };

// export default DynamicPDFReport;




// // import React, { useRef } from 'react';
// // import html2canvas from 'html2canvas';
// // import jsPDF from 'jspdf';
// // import './DynamicPDFReport.css';


// // const DynamicPDFReport = ({ tablesData }) => {
// //   const reportRef = useRef(null);

// //   const generatePDF = () => {
// //     if (reportRef.current) {
// //       html2canvas(reportRef.current).then((canvas) => {
// //         const imgWidth = 210;  
// //         const pageHeight = 295;  
// //         const imgHeight = (canvas.height * imgWidth) / canvas.width;
// //         let heightLeft = imgHeight;
// //         const pdf = new jsPDF('p', 'mm', 'a4');

// //         const contentDataURL = canvas.toDataURL('image/png');
// //         let position = 10; 

// //         pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
// //         heightLeft -= pageHeight;

// //         while (heightLeft >= 0) {
// //           position = heightLeft - imgHeight;
// //           pdf.addPage();
// //           pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
// //           heightLeft -= pageHeight;
// //         }

// //         // Add header and footer
// //         const totalPages = pdf.internal.getNumberOfPages();
// //         for (let i = 1; i <= totalPages; i++) {
// //           pdf.setPage(i);
// //           pdf.setFontSize(12); 
// //           pdf.setFont("times", "bold"); 
// //           pdf.setTextColor(40, 40, 40); 
// //           pdf.text('SecureDapp', 10, 10); 
// //           pdf.setDrawColor(0, 128, 0);  
// //           pdf.line(10, 15, 300, 15); 

// //           pdf.setDrawColor(0, 128, 0);  
// //           pdf.line(10, 270, 200, 270);
// //           pdf.setFontSize(10);
// //           pdf.setFont("times", "bold");
// //           pdf.setTextColor(100, 100, 100); 
// //           pdf.text('SecureDapp', 10, 275);
// //           pdf.setFont("times", "normal");
// //           pdf.text('235, 2nd & 3rd Floor, 13th Cross Rd, Indira Nagar II Stage,', 10, 280, null, null, 'left'); // Aligned to the left
// //           pdf.text('Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038', 10, 285, null, null, 'left');
// //           pdf.text('securedapp.in', 10, 290, null, null, 'left');
// //         }

// //         pdf.save('report.pdf');
// //       });
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <div ref={reportRef} className="report-card">

// //         {/* Page 1: Heading with logo and date */}
// //         <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="SecureDapp Logo" className='w-1/3 h-20' />
// //         <h1 className="report-title">SecureDApp Solidity Shield Audit Report</h1>
// //         <p>{data.date}</p>

// //         {/* Page 2: Executive Summary */}
// //         <h2>Executive Summary</h2>
// //         <table className="report-table">
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Contracts</th>
// //               <th>Lines</th>
// //               <th>Assembly Lines</th>
// //               <th>ERCS</th>
// //               <th>Findings</th>
// //               <th>Detectors</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             <tr>
// //               <td>{data.id}</td>
// //               <td>{data.contracts}</td>
// //               <td>{data.lines}</td>
// //               <td>{data.assembly_lines}</td>
// //               <td>{data.ercs.join(", ")}</td>
// //               <td>{JSON.stringify(data.findings)}</td>
// //               <td>{data.detectors}</td>
// //             </tr>
// //           </tbody>
// //         </table>

// //         {/* Page 3: Vulnerabilities Found */}
// //         <h2>Vulnerabilities Found</h2>
// //         {Object.keys(data).filter(key => ["1", "2", "3", "4", "5"].includes(key)).map((key) => (
// //           <div key={key}>
// //             <h3>{['Critical', 'Medium', 'Low', 'Informational', 'Optimisation'][key - 1]}</h3>
// //             <table className="report-table">
// //               <thead>
// //                 <tr>
// //                   <th>Type</th>
// //                   <th>References</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {Object.entries(data[key]).map(([type, references]) => (
// //                   <tr key={type}>
// //                     <td>{type}</td>
// //                     <td>{references.join(", ")}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         ))}

// //         {/* Page 4: Disclaimer & Contact Us */}
// //         <h2>Disclaimer</h2>
// //         <p>... disclaimer content ...</p>
// //         <h2>Contact Us</h2>
// //         <p>SecureDapp</p>
// //         <p>235, 2nd & 3rd Floor, 13th Cross Rd, Indira Nagar II Stage,</p>
// //         <p>Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038</p>
// //         <p>securedapp.in</p>

// //       </div>

// //       <button onClick={generatePDF} className="generate-button">
// //         Generate PDF
// //       </button>
// //     </div>
// //     // <div className="container">
// //     //   <div ref={reportRef} className="report-card">
// //     //     <h1 className="report-title">Dynamic Report</h1>

// //     //     {/* Loop through tablesData and render each table */}
// //     //     {tablesData.map((table, idx) => (
// //     //       <div key={idx}>
// //     //         <h2>{table.title}</h2>
// //     //         <table className="report-table">
// //     //           <thead>
// //     //             <tr>
// //     //               {table.headers.map((header, idx) => (
// //     //                 <th key={idx}>{header}</th>
// //     //               ))}
// //     //             </tr>
// //     //           </thead>
// //     //           <tbody>
// //     //             {table.rows.map((row, rowIndex) => (
// //     //               <tr key={rowIndex}>
// //     //                 {table.headers.map((header, idx) => (
// //     //                   <td key={idx}>{row[header]}</td>
// //     //                 ))}
// //     //               </tr>
// //     //             ))}
// //     //           </tbody>
// //     //         </table>
// //     //       </div>
// //     //     ))}
// //     //     <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="Description of Image" className='w-1/3 h-20'/>
// //     //   </div>

// //     //   <button onClick={generatePDF} className="generate-button">
// //     //     Generate PDF
// //     //   </button>
// //     // </div>
// //   );
// // };

// // export default DynamicPDFReport;

// // DynamicPDFReport.js
// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//     page: {
//         padding: 30,
//     },
//     header: {
//         fontSize: 20,
//         marginBottom: 20,
//     },
//     table: {
//         display: "table",
//         width: "auto",
//         borderStyle: "solid",
//         borderWidth: 1,
//         borderRightWidth: 0,
//         borderBottomWidth: 0,
//     },
//     tableRow: {
//         margin: "auto",
//         flexDirection: "row",
//     },
//     tableColHeader: {
//         width: "20%",
//         borderStyle: "solid",
//         borderWidth: 1,
//         borderLeftWidth: 0,
//         borderTopWidth: 0,
//         backgroundColor: "#eaeaea",
//     },
//     tableCol: {
//         width: "20%",
//         borderStyle: "solid",
//         borderWidth: 1,
//         borderLeftWidth: 0,
//         borderTopWidth: 0,
//     },
//     tableCellHeader: {
//         margin: 5,
//         fontSize: 12,
//         fontWeight: "bold",
//     },
//     tableCell: {
//         margin: 5,
//         fontSize: 10,
//     },
// });

// function PDFReport({ tablesData }) {
//     return (
//         <Document>
//             <Page style={styles.page}>
//                 <Text style={styles.header}>{tablesData.title}</Text>
//                 {tablesData.tables.map((table, tableIndex) => (
//                     <View key={tableIndex}>
//                         <Text>{table.title}</Text>
//                         <View style={styles.table}>
//                             {/* Headers */}
//                             <View style={styles.tableRow}>
//                                 {table.headers.map((header, headerIndex) => (
//                                     <View key={headerIndex} style={styles.tableColHeader}>
//                                         <Text style={styles.tableCellHeader}>{header}</Text>
//                                     </View>
//                                 ))}
//                             </View>
//                             {/* Rows */}
//                             {table.data.map((row, rowIndex) => (
//                                 <View key={rowIndex} style={styles.tableRow}>
//                                     {row.map((cell, cellIndex) => (
//                                         <View key={cellIndex} style={styles.tableCol}>
//                                             <Text style={styles.tableCell}>{cell}</Text>
//                                         </View>
//                                     ))}
//                                 </View>
//                             ))}
//                         </View>
//                     </View>
//                 ))}
//             </Page>
//         </Document>
//     );
// }

// function DynamicPDFReport({ tablesData }) {
//     return (
//         <div>
//             <PDFDownloadLink 
//                 document={<PDFReport tablesData={tablesData} />} 
//                 fileName="report.pdf"
//             >
//                 {({ blob, url, loading, error }) =>
//                     loading ? "Loading document..." : "Download PDF"
//                 }
//             </PDFDownloadLink>
//         </div>
//     );
// }

// export default DynamicPDFReport;

