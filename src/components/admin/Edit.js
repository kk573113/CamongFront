import { useEffect, useState } from "react";
import Nav from "../Nav";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ExpContainer = styled.div`
  width: 1000px;
  height: 260px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: #315c40;
  padding-top: 3vh;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  @media screen and (max-width: 1000px) {
    width: 90%; 
  }
  overflow: scroll;
  overflow-x: hidden;
`;

const Exp = styled.div`
  width: 900px;
  height: 55px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1vh;
  background-color: #e4e4e4;
  justify-content: space-between;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1000px) {
    width: 90%; 
  }
`;
const ExpTitle = styled.h2`
  color: #303030;
  margin: 0px;
  font-weight: bold;
  font-size: 20px;
  padding-left: 3vw;
`;
const EditBtn = styled.button`
  background-color: #4b3327;
  font-weight: bold;
  font-size: 15px;
  border: none;
  color: white;
  width: 50px;
  height: 5vh;
  border-radius: 20px;
  margin-right: 10px;
`;
const DelBtn = styled.button`
  background-color: #4b3327;
  font-weight: bold;
  font-size: 15px;
  border: none;
  color: white;
  width: 50px;
  height: 5vh;
  border-radius: 20px;
  margin-right: 30px;
`;
const AddExpContainer = styled.div`
  margin-top: 3vh;
  width: 80vw;
  height: 30vh;
  margin-left: 10vw;
  border-radius: 20px;
  background-color: #d8d8d8;

  @media screen and (max-width: 1000px) {
    width: 90%; 
  }
`;
const AddExpTitle = styled.input`
  width: 750px;
  height: 40px;
  margin-bottom: 20px;
  border: none;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 20px;
  font-weight: bold;

  @media screen and (max-width: 1000px) {
    width: 60vw; 
  }
`;
const AddExpImage = styled.div`
  width: 750px;
  height: 40px;
  display: flex;
  font-size: 20px;
  font-weight: bold;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  @media screen and (max-width: 1000px) {
    width: 60vw; 
  }
`;
const AddBtn = styled.button`
  width: 100px;
  background-color: #315c40;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;
  
  @media screen and (max-width: 1000px) {
    width: 12%; 
  }
`;

const Edit = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [exp, setExp] = useState([]);
  const [title, setTitle] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle((prev) => value);
    }
  };
  const handleDel = async (expId) => {
    try {
      const response = await axios.delete(
        `http://35.216.68.47:8080/api/experiences/${expId}`,
        {
          headers: {
            accept: "*/*",
          },
        }
      );

      console.log("Deletion successful:", response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    window.location.reload();
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append title to formData
    formData.append("request", JSON.stringify({ title }));

    // Check if an image is selected
    if (selectedFile) {
      // Append the selected file to formData with the key 'image'
      formData.append("image", selectedFile, setSelectedFile.name);
    }

    try {
      // Make a POST request to submit the data
      const response = await axios.post(
        "http://35.216.68.47:8080/api/experiences",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success, e.g., show a success message
      console.log("Submission successful:", response.data);

      // Optionally, update the 'exp' state with the new data
      // setExp((prevExp) => [...prevExp, response.data]);

      // Reset the form values
      setTitle("");
      setSelectedFile(null);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error submitting data:", error);
    }
    window.location.reload();
  };
  useEffect(() => {
    axios
      .get("http://35.216.68.47:8080/api/experiences")
      .then(function (response) {
        // 성공 핸들링
        console.log(response);
        setExp(response.data.result.content);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      })
      .finally(function () {
        // 항상 실행되는 영역
      });
  }, []);

  return (
    <div>
      <Nav fontcolor={"#315C40"} />
      <ExpContainer>
        <Exp
          onClick={() => {
            navigate("/exp");
          }}
        >
          <ExpTitle>몰드 초콜릿</ExpTitle>
          <div>
            <EditBtn>편집</EditBtn>
            <DelBtn>삭제</DelBtn>
          </div>
        </Exp>
        <Exp>
          <ExpTitle>빼빼로 만들기</ExpTitle>
          <div>
            <EditBtn>편집</EditBtn>
            <DelBtn>삭제</DelBtn>
          </div>
        </Exp>
      </ExpContainer>
      <AddExpContainer onSubmit={onSubmit}>
        <h1
          style={{
            fontSize: "40px",
            color: "#315C40",
            paddingLeft: "2vw",
            paddingTop: "2vh",
          }}
        >
          체험
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5vh",
          }}
        >
          <div>
            <div>
              <span
                style={{
                  color: "#4B3327",
                  fontWeight: "bold",
                  paddingLeft: "2vw",
                  paddingRight: "1vw",
                  fontSize: "20px"
                }}
              >
                체험명
              </span>
              <AddExpTitle
                onChange={onChange}
                name="title"
                placeholder="체험명을 입력하세요"
              ></AddExpTitle>
            </div>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  color: "#4B3327",
                  fontWeight: "bold",
                  paddingLeft: "2vw",
                  paddingRight: "1vw",
                  fontSize: "20px"
                }}
              >
                이미지
              </span>
              <label htmlFor="file">
                {selectedFile ? (
                  <AddExpImage>Selected file: {selectedFile.name}</AddExpImage>
                ) : (
                  <AddExpImage>이미지 불러오기</AddExpImage>
                )}
              </label>
              <input
                style={{ display: "none" }}
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <AddBtn>체험 추가</AddBtn>
        </div>
      </AddExpContainer>
    </div>
  );
};
export default Edit;
