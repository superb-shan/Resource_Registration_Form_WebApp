import React, { useState, createContext } from "react";

export const ItemsContext = createContext();

const ItemsProvider = ({ children }) => {

    const [name, setName] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [Designation, setDesignation] = useState('');
    const [Department, setDepartment] = useState('');
    const [EmpID,setEmpID]=useState('');
    const [printing,setPrinting]=useState(null);
    const [guestMomento,setGuestMomento]=useState(null);
    const [studentMomento,setStudentMomento]=useState(null);
    const [printedEnvelope,setprintedEnvelope]=useState(null);
    const [answerBooklet,setAnswerbooklet]=useState(null);
    const [studentNotebook,setStudentnotebook]=useState(null);
    const [studentNotebookWithGraph,setStudentnotebookwithgraph]=useState(null);
    const [studentNotebookWithoutGraph,setStudentnotebookwithoutgraph]=useState(null);
    const [observation,setObservation]=useState(null);
    const [purpose,setPurpose]=useState('');
    const [withindays,setwithindays]=useState(null);
    const [Ondate, setofdate ]=useState(null);


  
  
    return (
      <ItemsContext.Provider
        value={{
            //send all the created variables
            name, setName,
            EmpID, setEmpID,
            selectedDate, setSelectedDate,
            Designation, setDesignation,
            Department, setDepartment,
            printing,setPrinting,
            guestMomento,setGuestMomento,
            studentMomento,setStudentMomento,
            printedEnvelope,setprintedEnvelope,
            answerBooklet,setAnswerbooklet,
            studentNotebook,setStudentnotebook,
            studentNotebookWithGraph,setStudentnotebookwithgraph,
            studentNotebookWithoutGraph,setStudentnotebookwithoutgraph,
            observation,setObservation,
            purpose,setPurpose,
            withindays,setwithindays,
            Ondate,setofdate

        }}
      >
        {children}
      </ItemsContext.Provider>
    );
  };
  
  export default ItemsProvider;
  