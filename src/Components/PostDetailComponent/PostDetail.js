import React, { useState, useEffect, createElement } from "react";
import { Colors } from "../Themes/colors";
import "bootstrap/dist/css/bootstrap.min.css";
import Media from "react-bootstrap/Media";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TitleLogo from "../../Images/title.jpg";
import CommentLogo from "../../Images/comment.png";
import { Comment, Avatar, Col, Row } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  UserOutlined,
} from "@ant-design/icons";

const PostDetail = (props) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const {
    match: {
      params: { post_id },
    },
  } = props;

  const getPost = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts/${post_id}`;
    const response = await fetch(url);
    const data = await response.json();
    setPost(data);
    setPostLoading(false);
  };

  const getComments = async () => {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${post_id}`;
    const response = await fetch(url);
    const data = await response.json();
    setComments(data);
    setCommentLoading(false);
  };

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Row>
      <Col span={24}>
        <span onClick={like}>
          {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
        <span onClick={dislike}>
          {React.createElement(
            action === "disliked" ? DislikeFilled : DislikeOutlined
          )}
          <span className="comment-action">{dislikes}</span>
        </span>
        <span key="comment-basic-reply-to">Reply to</span>
      </Col>
      <hr></hr>
    </Row>,
  ];

  return (
    <>
      {postLoading ? (
        <h2>Post Loading...</h2>
      ) : (
        <>
          <Navbar bg="secondary" variant="light">
            <Navbar.Brand href="#" className="mr-auto">
              {" "}
              <Button variant="danger">Post Details Screen</Button>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#">Screen2</Nav.Link>
              </Nav>
              <Form inline action="">
                <FormControl
                  type="text"
                  placeholder="Search Name/Email"
                  onChange={(event) => setSearchVal(event.target.value)}
                  className="mr-sm-2"
                />
              </Form>
            </Navbar.Collapse>
          </Navbar>

          <div
            style={{ maxWidth: "700px", margin: "0 auto", marginTop: "30px" }}
          >
            <Media>
              <img
                width={94}
                height={64}
                className="mr-3"
                src={TitleLogo}
                alt="Generic placeholder"
              />
              <Media.Body>
                <h5>Post Title</h5>
                <p>{post.title}</p>

                <Media>
                  <img
                    width={80}
                    height={64}
                    className="mr-3"
                    src={CommentLogo}
                    alt="Generic placeholder"
                  />
                  <Media.Body>
                    <h5>Post Comments</h5>
                    <p>{post.body}</p>
                  </Media.Body>
                </Media>
              </Media.Body>
            </Media>
          </div>
        </>
      )}

      {commentLoading ? (
        <div>
          <h1>Comments Loading...</h1>
          <hr />
        </div>
      ) : (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h4>Comments:</h4>

          {comments
            .filter((val) => {
              if (searchVal == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                val.email.toLowerCase().includes(searchVal.toLowerCase()) ||
                val.body.toLowerCase().includes(searchVal.toLowerCase())
              ) {
                return val;
              }
            })
            .map((commentsItem, key) => (
              <Comment
                key={key}
                actions={actions}
                author={
                  <a>
                    <strong> Name:</strong> {commentsItem.name}
                  </a>
                }
                avatar={
                  <Avatar
                    shape="circle"
                    size={64}
                    icon={<UserOutlined />}
                    style={{
                      color: Colors.OrangeColor,
                      backgroundColor: Colors.lightOrangeColor,
                    }}
                  />
                }
                content={
                  <p>
                    <strong>Email:</strong>{" "}
                    <a style={{ color: Colors.OrangeColor }}>
                      {commentsItem.email}
                    </a>
                    <br></br>
                    <strong>Message:</strong> {commentsItem.body}
                  </p>
                }
              />
            ))}
        </div>
      )}
    </>
  );
};

export default PostDetail;
