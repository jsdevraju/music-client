import { deleteObject, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { getUserInfo } from "../app/api";
import Button from "../app/Components/Button/Button";
import ImageUploader from "../app/Components/ImageUploader/ImageUploader";
import ImageLoader from "../app/Components/ImgLoader/ImageLoader";
import Input from "../app/Components/Input/Input";
import Label from "../app/Components/Label/Label";
import { RootState } from "../app/store";
import { storage } from "../firebase";

const initialState = {
  name: "",
  email: "",
  avatar: "",
};

interface ChangeInput extends React.ChangeEvent<HTMLInputElement> {}

const Profile = () => {
  const [data, setData] = useState(initialState);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [avatar, setAvatar] = useState(data.avatar);
  const { token } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: ChangeInput) => {
    if (!e.target) return;
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const deleteImageObject = (image: string) => {
    const deleteRef = ref(storage, image);
    deleteObject(deleteRef).then(() => {
      toast.success("success");
      toast.error("File removed successfully");
      setAvatar("");
    });
  };

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        const res = await getUserInfo(token);
        setData(res)
        setAvatar(res.avatar);
      };
      getUser();
    }
  }, [token]);


  return (
    <>
      <section className="sec_p">
        <div className="container mx-auto sm:p-4 lg:p-0">
          <div className="flex items-center justify-center">
            <form className="w-[550px]">
              <div>
                <Label className="label" htmlFor="name">
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter name..."
                  className="input_auth"
                  id="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="label" htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                  className="input_auth"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div className="bg-card mt-4 backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
                {isImageLoading && <ImageLoader progress={uploadProgress} />}
                {!isImageLoading &&
                  (!avatar ? (
                    <ImageUploader
                      setImageURL={setAvatar}
                      isLoading={setIsImageLoading}
                      setProgress={setUploadProgress}
                      isImage={true}
                    />
                  ) : (
                    <div className="relative w-full h-full overflow-hidden rounded-md flex items-center justify-center">
                      <img
                        src={avatar && avatar}
                        alt="uploaded image"
                        className="w-[50px] h-[50px] object-cover"
                      />
                      <Button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                        onClick={() => {
                          deleteImageObject(avatar);
                        }}
                      >
                        <MdDelete className="text-white" />
                      </Button>
                    </div>
                  ))}
              </div>
              <Button className="btn-primary mt-4" type="submit">
                Update Profile
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
