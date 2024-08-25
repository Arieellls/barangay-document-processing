// Generated by Xata Codegen 0.30.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "events",
    checkConstraints: {
      events_xata_id_length_xata_id: {
        name: "events_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_events_xata_id_key: {
        name: "_pgroll_new_events_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "author",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "description",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "end_date",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "is_ongoing",
        type: "bool",
        notNull: false,
        unique: false,
        defaultValue: "true",
        comment: "",
      },
      {
        name: "start_date",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "title",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "user_id",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "officials",
    checkConstraints: {
      officials_xata_id_length_xata_id: {
        name: "officials_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_officials_xata_id_key: {
        name: "_pgroll_new_officials_xata_id_key",
        columns: ["xata_id"],
      },
      officials__pgroll_new_user_id_key: {
        name: "officials__pgroll_new_user_id_key",
        columns: ["user_id"],
      },
    },
    columns: [
      {
        name: "end_term",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "start_term",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "term_ended",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "user_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "users",
    checkConstraints: {
      users_xata_id_length_xata_id: {
        name: "users_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_users_xata_id_key: {
        name: "_pgroll_new_users_xata_id_key",
        columns: ["xata_id"],
      },
      users__pgroll_new_username_key: {
        name: "users__pgroll_new_username_key",
        columns: ["username"],
      },
    },
    columns: [
      {
        name: "age",
        type: "int",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "birthday",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "complete_address",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "contact_number",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "current_address",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "email_address",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "first_name",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "former_address",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "gender",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "image_path",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "is_voter",
        type: "bool",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "last_name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "middle_name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "password",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "place_of_birth",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "position",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "purok",
        type: "int",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "role",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "status",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "username",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Events = InferredTypes["events"];
export type EventsRecord = Events & XataRecord;

export type Officials = InferredTypes["officials"];
export type OfficialsRecord = Officials & XataRecord;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type DatabaseSchema = {
  events: EventsRecord;
  officials: OfficialsRecord;
  users: UsersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Manori-a-Arielito-s-workspace-0g26vc.us-east-1.xata.sh/db/hci",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
