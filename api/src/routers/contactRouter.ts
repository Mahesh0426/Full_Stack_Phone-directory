import express, { Request, Response } from "express";
import { apiResponse } from "../interface/apiResponse";
import Contact, { IContact } from "../schema/contactModel";

import { isValidObjectId } from "mongoose";

const contactRouter = express.Router();
// Create a new contact
contactRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newContact: IContact = new Contact(req.body);
    console.log("newcontact:", newContact);
    console.log("req.body:", req.body);

    if (!newContact.name || !newContact.phone) {
      throw new Error("Name and phone are required");
    }
    await newContact.save();
    const responseObj: apiResponse = {
      status: true,
      message: "Contact created successfully",
      data: newContact,
    };
    console.log("responseObj:", responseObj);

    res.status(201).json(responseObj);
    return;
  } catch (error) {
    console.error("Error in POST /contacts:", error);
    const errorObj: apiResponse = {
      status: false,
      message: "An error occurred while creating contact",
    };
    res.status(500).json(errorObj);
  }
});

// Get all contacts
contactRouter.get("/", async (req: Request, res: Response) => {
  try {
    const contacts: IContact[] = await Contact.find();
    const responseObj: apiResponse = {
      status: true,
      message: "Contacts retrieved successfully",
      data: contacts,
    };
    res.status(200).json(responseObj);
    return;
  } catch (error) {
    console.error("Error in GET /contacts:", error);
    const errorObj: apiResponse = {
      status: false,
      message: "An error occurred while getting contacts",
    };
    res.status(500).json(errorObj);
  }
});

// Get a contact by ID
contactRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const contact: IContact | null = await Contact.findById(req.params.id);
    if (!contact) {
      const errorObj: apiResponse = {
        status: false,
        message: "Contact not found",
      };
      res.status(404).json(errorObj);
      return;
    }
    const responseObj: apiResponse = {
      status: true,
      message: "Contact retrieved successfully",
      data: contact,
    };
    res.status(200).json(responseObj);
  } catch (error) {
    console.error("Error in GET /contact/:id:", error);
    const errorObj: apiResponse = {
      status: false,
      message: "Network error",
    };
    res.status(500).json(errorObj);
  }
});

// Delete contact by ID
contactRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      const errorObj: apiResponse = {
        status: false,
        message: "Invalid contact ID",
      };
      res.status(400).json(errorObj);
      return;
    }

    const contact: IContact | null = await Contact.findByIdAndDelete(
      req.params.id
    );

    if (!contact) {
      const errorObj: apiResponse = {
        status: false,
        message: "Contact not found",
      };
      res.status(404).json(errorObj);
      return;
    }

    const responseObj: apiResponse = {
      status: true,
      message: "Contact deleted successfully",
      data: contact,
    };
    res.status(200).json(responseObj);
  } catch (error) {
    console.error("Error in DELETE /contact/:id:", error);
    const errorObj: apiResponse = {
      status: false,
      message: "Network error",
    };
    res.status(500).json(errorObj);
  }
});

// Update contact by ID
contactRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      const errorObj: apiResponse = {
        status: false,
        message: "Invalid contact ID",
      };
      res.status(400).json(errorObj);
      return;
    }

    const updatedContact: IContact | null = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      const errorObj: apiResponse = {
        status: false,
        message: "Contact not found",
      };
      res.status(404).json(errorObj);
      return;
    }

    const responseObj: apiResponse = {
      status: true,
      message: "Contact updated successfully",
      data: updatedContact,
    };
    res.status(200).json(responseObj);
  } catch (error) {
    console.error("Error in PUT /contact/:id:", error);
    const errorObj: apiResponse = {
      status: false,
      message: "Network error",
    };
    res.status(500).json(errorObj);
  }
});

export default contactRouter;
