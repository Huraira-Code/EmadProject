import { Admin } from "../models/Admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const RegisterUser = asyncHandler(async (req, res) => {
  // Getting user detail from frontend
  const { fullName, email, password } = req.body;

  //checking validation
  // if (!(fullName && email && password)) {
  //   throw new ApiError(400, "All Fields are required...!");
  // }

  //checking if user already exists
  const existedUser = await Admin.findOne({
    $or: [{ email }, { password }],
  });

  if (existedUser) {
    throw new ApiError(
      400,
      "user with this email and password already exists..."
    );
  }

  // Send data to database
  const user = await Admin.create({
    fullName,
    email,
    password,
  });

  //Data for sending to frontend without password
  const createdUser = await Admin.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(400, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Created Successfully..."));
});

const LoginUser = asyncHandler(async (req, res) => {
  // getting data from frontend
  const { email, password } = req.body;
  //   checking validation
  if (!email || !password) {
    throw new ApiError(400, "All fields are required...!");
  }
  //Checking for existed  user
  const user = await Admin.findOne({
    $or: [{ email }, { password }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exist...");
  }
  //checking password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid Password...");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User LoggedIn Successfully..."));
});
export { RegisterUser, LoginUser };
