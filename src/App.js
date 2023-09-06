import React  from 'react';
import './App.css';
import DynamicPDFReport from './Dynamic';

function App() {

  const reportData = {
    "1": {},
    "2": {},
    "3": {
      "missing-zero-check": [
        "contracts/TokenContract.sol#1283",
        "contracts/TokenContract.sol#1286"
      ]
    },
    "4": {
      "pragma": [
        "contracts/TokenContract.sol#237",
        "contracts/TokenContract.sol#265",
        "contracts/TokenContract.sol#296",
        "contracts/TokenContract.sol#366",
        "contracts/TokenContract.sol#457",
        "contracts/TokenContract.sol#484",
        "contracts/TokenContract.sol#721",
        "contracts/TokenContract.sol#806",
        "contracts/TokenContract.sol#836",
        "contracts/TokenContract.sol#1221",
        "contracts/TokenContract.sol#1260",
        "contracts/TokenContract.sol#7"
      ],
      "dead-code": [
        "contracts/TokenContract.sol#67-72",
        "contracts/TokenContract.sol#685-689",
        "contracts/TokenContract.sol#79-84",
        "contracts/TokenContract.sol#171-180",
        "contracts/TokenContract.sol#332-343",
        "contracts/TokenContract.sol#307-327",
        "contracts/TokenContract.sol#25-31",
        "contracts/TokenContract.sol#220-229",
        "contracts/TokenContract.sol#194-203",
        "contracts/TokenContract.sol#474-476",
        "contracts/TokenContract.sol#154-156",
        "contracts/TokenContract.sol#50-60",
        "contracts/TokenContract.sol#38-43",
        "contracts/TokenContract.sol#676-678"
      ],
      "solc-version": [
        "contracts/TokenContract.sol#366",
        "contracts/TokenContract.sol#7",
        "contracts/TokenContract.sol#296",
        "contracts/TokenContract.sol#237",
        "contracts/TokenContract.sol#1260",
        "contracts/TokenContract.sol#457",
        "contracts/TokenContract.sol#721",
        "contracts/TokenContract.sol#836",
        "contracts/TokenContract.sol#265",
        "contracts/TokenContract.sol#484",
        "contracts/TokenContract.sol#1221",
        "contracts/TokenContract.sol#806"
      ],
      "naming-convention": [
        "contracts/TokenContract.sol#1300"
      ],
      "too-many-digits": [
        "contracts/TokenContract.sol#1268-1351",
        "contracts/TokenContract.sol#1277"
      ]
    },
    "5": {
      "immutable-states": [
        "contracts/TokenContract.sol#1279"
      ]
    },
    "id": "27f50180502a1f59713d0bcc728d1297592731cbe4ac1af86b48720f80913148",
    "contracts": 3,
    "lines": 447,
    "assembly_lines": 0,
    "ercs": [
      "ERC20",
      "ERC165"
    ],
    "findings": {
      "optimization_issues": 1,
      "informational_issues": 30,
      "low_issues": 1,
      "medium_issues": 0,
      "high_issues": 0
    },
    "detectors": 32,
    "detect": {}
  };

  

  return (
    <div className="App">
      <DynamicPDFReport reportData={reportData} />
    </div>
  );
}

export default App;
