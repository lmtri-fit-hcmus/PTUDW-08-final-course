const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
            default: "day la comment"
        },
        paper: {
            type: Schema.Types.ObjectId,
            ref: "Paper",
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);









// {
//     "_id": { "$oid": "5dea0db073fa07122cf5386b" },
//     "date": { "$numberLong": "1575619947223" },
//     "views": { "$numberInt": "2" },
//     "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
//         "content": "<p><strong><span style=\"font-size: 24px;\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></strong> Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like<strong>&nbsp;Aldus PageMaker&nbsp;</strong>including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br><br><br></p>",
//             "category_id": "5dea095038071a083c26abc3",
//                 "keywords": "life, Ipsum, test, hello",
//                     "image": "eg1.jpg",
//                         "num": { "$numberInt": "1" },
//     "__v": { "$numberInt": "0" }
// }