import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Colors } from "../Themes/colors";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBarComponent from "../AppBarComponent/Header";

const TableHeader = styled.tr`
  background: ${Colors.blueRedGradient};
  color: ${Colors.pureWhite};
  font-size: 1em;
`;

const PostComponent = () => {
  const [posts, setPost] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  const displayAllPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        setPostLoading(false);
        setPost(json);
      });
  };

  useEffect(() => {
    displayAllPost();
  }, []);

  return (
    <div>
      {postLoading ? (
        <div>Please hold while page Load....</div>
      ) : (
        <>
          <AppBarComponent />
          <div className="Container list-group mt-5 ml-5 mr-5 pt-5 pb-5 ">
            <table className="table table-hover table-dark">
              <thead>
                <TableHeader className="table">
                  <th scope="col">userId</th>
                  <th scope="col">Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Comments</th>
                </TableHeader>
              </thead>
              <tbody>
                {posts.map((item, key) => {
                  return (
                    <tr key={key}>
                      <Link to={`/posts/${item.id}`}>
                        <td>{item.id}</td>
                      </Link>
                      <td>{item.userId}</td>
                      <td>{item.title}</td>
                      <td>{item.body}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PostComponent;
