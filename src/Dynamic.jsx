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
        
        pdf.addImage(contentDataURL, 'PNG', 3, 3, imgWidth, imgHeight);
        const date = new Date().toLocaleDateString();

        // Add header and footer for every page
        pdf.setFontSize(12); 
        pdf.setFont("times", "bold"); 
        pdf.setTextColor(40, 40, 40); 
        pdf.text('SecureDapp', 10, 10);
        pdf.text(date, 180, 10); 
        pdf.setDrawColor(0, 128, 0);  
        pdf.line(5, 15, 205, 15); 

        pdf.setDrawColor(0, 128, 0);  
        pdf.line(10, 270, 200, 270);
        pdf.setFontSize(10);
        pdf.setFont("times", "bold");
        pdf.setTextColor(100, 100, 100); 
        pdf.text('SecureDapp', 10, 275);
        pdf.setFont("times", "normal");
        pdf.text('235, 2nd & 3rd Floor, 13th Cross Rd, Indira Nagar II Stage,', 10, 280, null, null, 'left');
        pdf.text('Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038', 10, 285, null, null, 'left');
        pdf.text('hello@securedapp.in', 10, 290, null, null, 'left');
        
        if (index === pages.length - 1) { 
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
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index}>
              {reportData[index] && Object.keys(reportData[index]).length > 0 && (
                <div>
                  <h3>{`Vulnerability: ${
                    [
                      'Critical',
                      'Medium',
                      'Low',
                      'Informational',
                      'Optimization',
                    ][index - 1]
                  }`}</h3>
                  {/* Render tables if they exist */}
                  <table className="vulnerabilities-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Locations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(reportData[index]).map(([type, locations]) => (
                        <tr key={type}>
                          <td>{type}</td>
                          <td>{locations.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Page 4: Disclaimer and Contact Us */}
        <div className="page">
          <h2 className='disclaimer'>Disclaimer</h2>
          <ol>
            <li><strong>Purpose:</strong> This audit report is provided for informational purposes only and is intended to assist the reader in understanding potential vulnerabilities and risks associated with the audited software.</li>
            <li><strong>Scope:</strong> The audit was performed based on the state of the software at the time of the audit and may not reflect its current state or any subsequent changes.</li>
            <li><strong>Limitations:</strong> While every effort has been made to ensure the accuracy and completeness of this report, no guarantee is made that all vulnerabilities or issues have been identified.</li>
            <li><strong>Responsibility:</strong> It remains the responsibility of the software's maintainers and users to ensure its security and proper functionality. </li>
          </ol>
          <h2 className='contact'>Contact Us</h2>
          <ul>
              <li><strong>Email:</strong> <a href="mailto: hello@securedapp.in"> hello@securedapp.in</a></li>
              <li><strong>Phone:</strong> +91-9606015868</li>
              <li><strong>Address:</strong><br></br>
              SecureDApp Solutions Pvt. Ltd.<br></br>
              235, 2nd & 3rd Floor,<br></br>
              13th Cross Rd, Indira Nagar II Stage,<br></br>
              Hoysala Nagar, Indiranagar,<br></br>
              Bengaluru, Karnataka 560038</li><br></br>
              <li><strong>Website:</strong> <a href="http://www.securedapp.in">www.securedapp.in</a></li>
              <li><strong>Support Portal:</strong> <a href="http://support.securedapp.in">support.securedapp.in</a></li>
              <li><strong>Business Hours:</strong> Monday to Friday, 9 AM - 6 PM IST</li>
          </ul>
        </div>
      </div>

      <button onClick={generatePDF} className="generate-button">
        Generate PDF
      </button>
    </div>
  );
};

export default DynamicPDFReport;


