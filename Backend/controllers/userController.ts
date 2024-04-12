export default {
  signupPost: async (req: any, res: any) => {
    try {
      console.log(req.body);
      res.status(200).send({ success: true });
    } catch (error) {
      console.log(error);
    }
  },
};
