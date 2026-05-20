import { Router } from "express";
import {
  createLeadHandler,
  deleteLeadHandler,
  exportLeadsHandler,
  getLeadByIdHandler,
  getLeadsHandler,
  updateLeadHandler,
} from "../controllers/lead.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createLeadSchema,
  leadIdSchema,
  leadQuerySchema,
  updateLeadSchema,
} from "../validators/lead.validator";

const router = Router();

router.use(authenticate);

router.get("/", validate(leadQuerySchema), getLeadsHandler);
router.get("/export/csv", validate(leadQuerySchema), exportLeadsHandler);

router.post(
  "/",
  authorizeRoles("admin", "sales"),
  validate(createLeadSchema),
  createLeadHandler
);

router.get("/:id", validate(leadIdSchema), getLeadByIdHandler);

router.patch(
  "/:id",
  authorizeRoles("admin", "sales"),
  validate(leadIdSchema),
  validate(updateLeadSchema),
  updateLeadHandler
);

router.delete(
  "/:id",
  authorizeRoles("admin"),
  validate(leadIdSchema),
  deleteLeadHandler
);

export default router;
