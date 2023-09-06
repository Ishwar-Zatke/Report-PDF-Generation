import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './DynamicPDFReport.css';

const DynamicPDFReport = ({ reportData }) => {

    const generatePDF = () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Title
        const date = new Date().toLocaleDateString();

        pdf.setFontSize(10); 
        pdf.setFont("times", "bold"); 
        pdf.setTextColor(40, 40, 40); 
        pdf.text(date, 180, 10); 
        pdf.setDrawColor(0, 128, 0);  
        pdf.line(5, 15, 205, 15); 
        pdf.setDrawColor(0, 128, 0);  
        pdf.line(10, 270, 200, 270);
        pdf.setFontSize(10);
        pdf.setFont("times", "bold");
        pdf.setTextColor(100, 100, 100);
        pdf.text(date, 180, 275); 
        pdf.text('SecureDapp', 10, 275);
        pdf.setFont("times", "normal");
        pdf.text('235, 2nd & 3rd Floor, 13th Cross Rd, Indira Nagar II Stage,', 10, 280, null, null, 'left');
        pdf.text('Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038', 10, 285, null, null, 'left');
        pdf.text('hello@securedapp.in', 10, 290, null, null, 'left');

        pdf.setFontSize(24);
        pdf.text('SecureDApp Solidity Shield Audit Report', 10, 20);
        
        // Executive Summary
        pdf.setFontSize(18);
        pdf.text('Executive Summary', 10, 40);
        pdf.autoTable({
            head: [['ID', 'Contracts', 'Lines', 'Assembly Lines', 'ERCs', 'Detectors']],
            body: [[
                reportData.id, 
                reportData.contracts, 
                reportData.lines, 
                reportData.assembly_lines, 
                reportData.ercs.join(', '),
                reportData.detectors
            ]],
            startY: 50
        });
        
        // Findings
        const findingsData = Object.entries(reportData.findings).map(([key, value]) => [key, value]);
        pdf.autoTable({
            head: [['Key', 'Value']],
            body: findingsData,
            startY: pdf.previousAutoTable.finalY + 10
        });

        // Vulnerabilities Found
        pdf.addPage();
        pdf.setFontSize(18);
        pdf.text('Vulnerabilities Found', 10, 20);
        let startY = 30;
        [1, 2, 3, 4, 5].forEach((index) => {
            if (reportData[index] && Object.keys(reportData[index]).length > 0) {
                const vulnerabilitiesData = Object.entries(reportData[index]).map(([type, locations]) => [type, locations.join(', ')]);
                pdf.autoTable({
                    head: [['Type', 'Locations']],
                    body: vulnerabilitiesData,
                    startY: startY
                });
                startY = pdf.previousAutoTable.finalY + 10;
            }
        });

        // Disclaimer and Contact Us
        pdf.addPage();
        pdf.setFontSize(18);
        pdf.text('Disclaimer', 10, 20);
        const disclaimerData = [
            ['Purpose', 'This audit report is provided for informational purposes only'],
            ['Scope', 'The audit was performed based on the state of the software at the time of the audit and may not reflect its current state or any subsequent changes.'],
            ['Limitations', 'While every effort has been made to ensure the accuracy and completeness of this report, no guarantee is made that all vulnerabilities or issues have been identified. Security audits do not guarantee complete system security.'],
            ['Recommendations', "The recommendations provided in this report are based on the best judgment of SecureDApp's security professionals. Implementation of these recommendations is at the discretion of the software's maintainers."],
            ['Responsibility', "It remains the responsibility of the software's maintainers and users to ensure its security and proper functionality. SecureDApp does not accept any liability for any damage or loss caused due to overlooked vulnerabilities or misinterpretations in this report."],

            // Add other rows as necessary...
        ];
        pdf.autoTable({
            head: [['Key', 'Description']],
            body: disclaimerData,
            startY: 30
        });

        pdf.setFontSize(18);
        pdf.text('Contact Us', 10, pdf.previousAutoTable.finalY + 20);
        const contactData = [
            ['Email', 'hello@securedapp.in'],
            ['Phone', '9606015868'],
            ['Address', 'SecureDApp Solutions Pvt. Ltd. 235, 2nd & 3rd Floor,13th Cross Rd, Indira Nagar II Stage,Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038'],
            ['Website', 'securedapp.in'],
            ['Business Hours', 'Monday to Friday, 9 AM - 6 PM IST'],
            // Add other rows as necessary...
        ];
        pdf.autoTable({
            head: [['Key', 'Value']],
            body: contactData,
            startY: pdf.previousAutoTable.finalY + 30
        });

        // Save the PDF
        pdf.save('report.pdf');
    };

    return (
        <div className="container">
          <div ref={reportRef} className="report-card">
    
            <div className="page">
              <img ref={logoRef} src={`${process.env.PUBLIC_URL}/headerImage.png`} alt="SecureDApp Logo" className="header-logo" />
              <h1 className="report-title">SecureDApp Solidity Shield Audit Report</h1>
              <h2>Executive Summary</h2>
              <table className="summary-table">
      <tbody>
        <tr>
          <td><strong>ID:</strong></td>
          <td>{reportData.id}</td>
        </tr>
        <tr>
          <td><strong>Contracts:</strong></td>
          <td>{reportData.contracts}</td>
        </tr>
        <tr>
          <td><strong>Lines:</strong></td>
          <td>{reportData.lines}</td>
        </tr>
        <tr>
          <td><strong>Assembly Lines:</strong></td>
          <td>{reportData.assembly_lines}</td>
        </tr>
        <tr>
          <td><strong>ERCs:</strong></td>
          <td>{reportData.ercs.join(', ')}</td>
        </tr>
        <tr>
          <td><strong>Findings:</strong></td>
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
        </tr>
        <tr>
          <td><strong>Detectors:</strong></td>
          <td>{reportData.detectors}</td>
        </tr>
      </tbody>
    </table>
            </div>
    
            {/* Vulnerabilities Found */}
            <div className="page">
            <img ref={logoRef} src={`${process.env.PUBLIC_URL}/headerImage.png`} alt="SecureDApp Logo" className="header-logo" />
              <h2>Vulnerabilities Found</h2>
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index}>
                  {reportData[index] && Object.keys(reportData[index]).length > 0 && (
                    <div>
                      <h3>{`Vulnerability: ${['Critical', 'Medium', 'Low', 'Informational', 'Optimization'][index - 1]}`}</h3>
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
    
            {/* Disclaimer and Contact Us */}
            <div className="page">
            <img ref={logoRef} src={`${process.env.PUBLIC_URL}/headerImage.png`} alt="SecureDApp Logo" className="header-logo" />
              <h2>Disclaimer</h2>
              <table className="info-table">
                <tbody>
                  <tr>
                    <td><strong>Purpose:</strong></td>
                    <td>This audit report is provided for informational purposes only...</td>
                  </tr>
                  <tr>
                <td><strong>Scope:</strong></td>
                <td>The audit was performed based on the state of the software at the time of the audit and may not reflect its current state or any subsequent changes.</td>
            </tr>
            <tr>
                <td><strong>Limitations:</strong></td>
                <td>While every effort has been made to ensure the accuracy and completeness of this report, no guarantee is made that all vulnerabilities or issues have been identified. Security audits do not guarantee complete system security.</td>
            </tr>
            <tr>
                <td><strong>Responsibility:</strong></td>
                <td>It remains the responsibility of the software's maintainers and users to ensure its security and proper functionality. SecureDApp does not accept any liability for any damage or loss caused due to overlooked vulnerabilities or misinterpretations in this report.</td>
            </tr>
            <tr>
                <td><strong>Recommendations:</strong></td>
                <td>The recommendations provided in this report are based on the best judgment of SecureDApp's security professionals. Implementation of these recommendations is at the discretion of the software's maintainers.</td>
            </tr>
                </tbody>
              </table>
              <h2>Contact Us</h2>
              <table className="info-table">
                <tbody>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td><a href="mailto: hello@securedapp.in">hello@securedapp.in</a></td>
                  </tr>
                  <tr>
                <td><strong>Phone:</strong></td>
                <td>+91-9606015868</td>
            </tr>
            <tr>
                <td><strong>Address:</strong></td>
                <td>SecureDApp Solutions Pvt. Ltd.<br/>
                    235, 2nd & 3rd Floor,<br/>
                    13th Cross Rd, Indira Nagar II Stage,<br/>
                    Hoysala Nagar, Indiranagar,<br/>
                    Bengaluru, Karnataka 560038
                </td>
            </tr>
            <tr>
                <td><strong>Website:</strong></td>
                <td><a href="http://www.securedapp.in" target="_blank" rel="noopener noreferrer">www.securedapp.in</a></td>
            </tr>
            <tr>
                <td><strong>Support Portal:</strong></td>
                <td><a href="http://support.securedapp.in" target="_blank" rel="noopener noreferrer">support.securedapp.in</a></td>
            </tr>
            <tr>
                <td><strong>Business Hours:</strong></td>
                <td>Monday to Friday, 9 AM - 6 PM IST</td>
            </tr>
                </tbody>
              </table>
            </div>
          </div>
    
          <button onClick={generatePDF} className="generate-button">
            Generate PDF
          </button>
        </div>
    );
};

export default DynamicPDFReport;
