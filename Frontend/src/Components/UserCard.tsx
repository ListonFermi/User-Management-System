function UserCard() {
  return (
    <div className="flex justify-center align-middle m-10">
      <div className="md:flex md:w-[75%]  w-[90%] border">
        <div className="p-10 h-[85%] md:w-[45%] w-[90%]">
          <img src="https://picsum.photos/200/300" alt=""  />
          <input type="file" />
          <button className="p-2 bg-fuchsia-700 text-white font-bold my-2 rounded">Upload Image</button>
        </div>
        <div className="p-10">
          <h1>Name:</h1>
          <h1>Email:</h1>
          <h1>Phone number:</h1>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
