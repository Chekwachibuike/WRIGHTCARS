export const formatResponseRecord: (record: any, recordType?: string) => any = (
  record,
  recordType
) => {
  if (typeof record !== "object" || !record) {
    return record;
  }
  if (record instanceof Date) {
    return record;
  }

  // Remove Sequelize metadata and convert to plain object
  const plainRecord = record.get ? record.get({ plain: true }) : record;

  // Handle nested objects and arrays
  const formattedRecord: Record<string, any> = Object.keys(plainRecord).reduce((acc, key) => {
    if (typeof plainRecord[key] === "object" && plainRecord[key] !== null) {
      if (Array.isArray(plainRecord[key])) {
        return {
          ...acc,
          [key]: plainRecord[key].map((item: any) => formatResponseRecord(item)),
        };
      }
      return { ...acc, [key]: formatResponseRecord(plainRecord[key]) };
    }
    return { ...acc, [key]: plainRecord[key] };
  }, {});

  // Special formatting for specific record types
  switch (recordType) {
    case "addonGroup":
      return {
        ...formattedRecord,
        addons: formattedRecord.addons?.sort(
          (a: any, b: any) => a.order - b.order
        ),
      };
    case "product":
      return {
        ...formattedRecord,
        variants: formattedRecord.variants?.sort(
          (a: any, b: any) => a.price - b.price
        ),
      };
    default:
      return formattedRecord;
  }
};

export const formatPhoneNumber = (str: string | undefined) => {
  if (!str || str === "undefined" || typeof str !== "string") return "";
  const output = str
    .replace(/[\s|/]/g, "")
    .replace(/^\+?234\(0\)/, "0")
    .replace(/^\+?2340*/, "0");
  return output;
};
