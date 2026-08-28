import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const BlogView = ({
  blogs,
  handleLikeBlog,
  handleRemoveBlog,
  handleEditBlog,
  user,
  status,
}) => {
  let params = useParams();
  const idBlog = params.blogId;
  const blog = blogs.find((blog) => blog.id == idBlog);
  if (status === true) {
    return "Loading...";
  }
  if (status === false && blog === undefined) {
    return "Blog no encontrado";
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h1" component="div" sx={{ fontSize: "1.8rem" }}>
          {blog.title}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          by {blog.author}
        </Typography>
        <Link href={blog.url} variant="body1">
          {blog.url}
        </Link>
        <Typography sx={{ color: "text.secondary" }} variant="body2">
          Added by {blog.user.username}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <div className="likes">
          {blog.likes} Likes
          {user && (
            <Button
              sx={{
                color: "blue",
                borderColor: "blue",
                ml: 1.5,
                transition: "all 0.5s ease-in-out",
                "&:hover": {
                  backgroundColor: "blue",
                  color: "white",
                  borderColor: "blue",
                },
              }}
              variant="outlined"
              onClick={() => {
                handleLikeBlog(blog);
              }}
            >
              like
            </Button>
          )}
        </div>
        {user && blog.user.username === user.username && (
          <Button
            onClick={() => handleRemoveBlog(blog)}
            sx={{
              color: "red",
              borderColor: "red",
              ml: 1.5,
              transition: "all 0.5s ease-in-out",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
                borderColor: "red",
              },
            }}
            variant="outlined"
          >
            remove
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BlogView;
