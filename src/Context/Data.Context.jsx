import React, { createContext } from "react";
import { useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const allDepartments = ['AI&DS/ML', 'CCE', 'CSE', 'CSBS', 'ECE', 'EEE', 'HEC', 'IT', 'MECH', 'PLAC', 'SLC', 'SnH'];
  return (
    <DataContext.Provider
      value={

        {
          isAvailabilityLoading, setIsAvailabilityLoading,
          allDepartments,
          terms:
          {
            startDateTime: 'Start Date and Time',
            endDateTime: 'End Date and Time',
            hallRequired: 'Hall Required',
            coordinatorName: 'Coordinator Name',
            organizingDepartment: 'Organizing Department',
            coordinatorPhoneNumber: 'Coordinator Phone Number',
            UserName: 'User Name',
            CoordinatorPhoneNumber: 'Coordinator Phone Number',
            StartDateTime: 'Start Date and Time',
            EndDateTime: 'End Date and Time',
            HallRequired: 'Hall Required',
            CoordinatorName: 'Coordinator Name',
            OrganizingDepartment: 'Organizing Department',
            GuestName: 'Guest Name',
            GuestPhoneNumber: 'Guest Phone Number',
            PurposeOfTravel: 'Purpose Of Travel',
            TravelDateTime: 'Travel Date Time',
            PickupLocation: 'Pickup Location',
            DropLocation: 'Drop Location',
            NoOfPassengers: 'Number Of Passengers',
            SpecialRequirements: 'Special Requirements',
            Remarks: 'Remarks',
            Date: 'Date',
            Time: 'Time',
            SpeakerName: 'Speaker Name',
            speakerName: 'Speaker Name',
            SpeakerPhoneNumber: 'Speaker Phone Number',
            Topic: 'Topic',
            NoOfAttendees: 'Number Of Attendees',
            EquipmentsRequired: 'Equipments Required',
            PurposeOfStay: 'Purpose Of Stay',
            FoodRequired: 'Food Required',
            MenuRequired: 'Menu Required',
            PaymentDoneBy: 'Payment Done By',
            NoOfGuests: 'Number Of Guests',
            RoomRequired: 'Room Required',
            RequisitionDateTime: 'Requisition Date and Time',
            RequestorEmpId: 'Requestor Employee ID',
            RequestorName: 'Requestor Name',
            Department: 'Department',
            PurposeOfRequisition: 'Purpose Of Requisition',
            Printing: 'Printing',
            GuestMomento: 'Guest Momento',
            StudentMomento: 'Student Momento',
            PrintedEnvelopes: 'Printed Envelopes',
            AnswerBooklets: 'Answer Booklets',
            StudentNotebooks: 'Student Notebooks',
            RecordNoteWithGraph: 'Record Note With Graph',
            ObservationBook: 'Observation Book',
            RecordNoteWithoutGraph: 'Record Note Without Graph',
            ClearanceOfBill: 'Clearance Of Bill',
            category: 'Category',
            Category: 'Category',
          }
        }}

    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
