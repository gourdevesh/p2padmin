import React from "react";
import { useParams } from "react-router-dom";
import { ReplyTicket } from "./ReplyTicket"; // adjust path

const ReplyTicketWrapper: React.FC = () => {
    const { ticketId } = useParams<{ ticketId: string }>();

    // Fetch ticket data by ticketId here
    const ticket = {
        ticket_id: ticketId || "0",
        subject: "Sample Ticket",
        status: "open" as const,
        replies: [],
        onClose: () => console.log("Ticket closed"),
        onReply: (msg: string) => console.log("Reply:", msg),
    };

    return <ReplyTicket {...ticket} />;
};

// ✅ Add export
export default ReplyTicketWrapper;
