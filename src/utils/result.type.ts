export type Result<TPayload, TError> =
  | {
      type: "ok";
      data: TPayload;
    }
  | {
      type: "error";
      error: TError;
    };
