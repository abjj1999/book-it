import mongoose from "mongoose";

const dbConnect = () => {
    if (mongoose.connections[0].readyState >= 1) {
        // Use current db connection
        return;
    }
    // Use new db connection
    mongoose
        .connect(process.env.PUBLIC_LOCAL_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        .then((res) => console.log("DB Connected"))
        .catch((err) => console.log(err));
}

export default dbConnect;