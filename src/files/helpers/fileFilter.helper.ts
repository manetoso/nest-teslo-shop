const FILES_SUPPORTED = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) => {
  if (!file) return callback(new Error('No file provided'), false);
  const fileExtension = file.mimetype.split('/')[1];
  if (!FILES_SUPPORTED.includes(fileExtension))
    return callback(new Error('File type not supported'), false);
  callback(null, true);
};
