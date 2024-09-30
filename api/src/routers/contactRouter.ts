import { Router, Request, Response } from "express";
import { apiResponse } from "../interface/apiResponse";
import Contact, { IContact } from "../schema/contactModel";
import { isValidObjectId } from "mongoose";

const contactRouter = Router();
// Create a new contact
contactRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Create a new instance of Contact with the request body
    const newContact = new Contact(req.body);

    // Save the new contact to the database
    const savedContact: IContact = await newContact.save();

    const responseObj: apiResponse = {
      status: true,
      message: "Contact created successfully",
      data: savedContact,
    };
    res.status(201).json(responseObj);
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
