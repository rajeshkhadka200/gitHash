import User from "../model/userModal.js";
// add
export const auth = async (req, res) => {
  try {
    const { imageUrl, name, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        mesg: "Login successfull",
        user,
      });
    }
    // api key generate
    const apiKey = (
      Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10) +
      new Date().getTime()
    ).substring(0, 16);

    const newUser = await User.create({
      name,
      email,
      profilePic: imageUrl,
      token: apiKey,
    });

    return res.status(200).json({
      mesg: "Account created successfully",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      mesg: "Internal server error",
      err,
    });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      return res.status(200).json({
        mesg: "User found",
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesg: "Internal server error",
      error,
    });
  }
};

export const addPublication = async (req, res) => {
  const { pubId, userId } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { publication: pubId } },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({
        mesg: "Publication added",
        user: updatedUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesg: "Internal server error",
      error,
    });
  }
};
export const appAPIKey = async (req, res) => {
  const { apiKey, userId } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { hashnodeApiKey: apiKey } },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({
        mesg: "Publication added",
        user: updatedUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesg: "Internal server error",
      error,
    });
  }
};
