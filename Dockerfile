FROM golang

WORKDIR /go/src/app
COPY . .

RUN git clone https://github.com/aggarwalanubhav/students-api.git
RUN cd students-api
RUN go mod download
RUN go build cmd/students-api/main.go
