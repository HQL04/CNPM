import ProgressiveImage from "react-progressive-graceful-image";
import upload_button from '../../assets/img/upload-file.png';

function UploadArea({ setLength }){

    const uploadFiles = (files) => {
        const storedFiles = localStorage.getItem('files');
        let updated_files = [];
    
        if (storedFiles !== null) {
            updated_files = JSON.parse(storedFiles);
        }
    
        const newFiles = files.map(file => file.name);
        updated_files = newFiles.concat(updated_files);

        const newLength = updated_files.length;

        const files_set = new Set(updated_files);
        updated_files = [...files_set];

        localStorage.setItem('files', JSON.stringify(updated_files));

        setLength(newLength);
    };
    

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer?.files || [];
        uploadFiles(Array.from(droppedFiles));
    };
    
    const handleFileUpload = (event) => {
        event.preventDefault();
        const uploadedFiles = event.target?.files || [];
        uploadFiles(Array.from(uploadedFiles));
    };
    
    
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div 
            className="col-5 d-flex justify-content-center bg-primary rounded-4 p-2" 
            style={{ 
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
                border: 'solid 1px rgba(255, 255, 255, 1)',
                width: '50%', height:'100%' 
            }}
        >
            <div 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="text-center" 
                style={{ height: '80%' }}
            >
                <ProgressiveImage src={upload_button}>
                    {(src, loading) => (
                    <img
                        src={src} 
                        className={`d-block mx-auto image${loading ? " loading" : " loaded"}`}
                        alt="Upload Logo" 
                        id = "upload-logo"
                        draggable="false"
                    />)}
                </ProgressiveImage>
                <div className="text">Thả tài liệu tại đây</div>
                <br/>
              
                <input
                    id = "fileInput"
                    name="file" type = "file"
                    multiple={true}
                    style={{ display: 'none' }} 
                    onChange={handleFileUpload}
                />
                <button className="btn text-white fw-medium" id = "button" onClick={() => document.getElementById('fileInput').click()}>
                    Chọn tài liệu
                </button>
            </div>
        </div>
    );
}

export default UploadArea;