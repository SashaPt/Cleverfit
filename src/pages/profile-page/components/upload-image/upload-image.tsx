import './upload-image.scss';
import { useUploadMutation } from '../../../../services/profileApi';
import { Button, Upload, UploadFile, UploadProps } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserImage, setImage } from '@redux/profile/profileSlice';
import { ProfileErrorModal } from '../profile-error-modal/profile-error-modal';
import { useDispatch } from 'react-redux';
import { selectIsMobile } from '@redux/calendar/calendarSlice';

export const UploadImage: React.FC<{
    setError: () => void;
    setSuccess: () => void;
}> = ({ setError, setSuccess }) => {
    const [upload] = useUploadMutation();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const dispatch = useDispatch();
    const userImage = useAppSelector(selectUserImage);
    const isMobile = useAppSelector(selectIsMobile);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadImage = async (options: any) => {
        const { file } = options;
        const fmData = new FormData();
        fmData.append('file', file);
        try {
            const resp = await upload(fmData).unwrap();
            const imgUrl = `https://training-api.clevertec.ru${resp.url}`;
            dispatch(setImage(imgUrl));
            setSuccess();
            setFileList([
                {
                    uid: file.uid,
                    name: file.name,
                    url: imgUrl,
                    thumbUrl: imgUrl,
                },
            ]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (
                error.status === 409 &&
                (error.data?.message ? error.data?.message === 'Файл слишком большой' : true)
            ) {
                setIsErrorModalOpen(true);
            }
            setError();
            setFileList([
                {
                    uid: '-2',
                    name: 'image.png',
                    status: 'error',
                },
            ]);
        }
    };

    const handleChange: UploadProps['onChange'] = (info) => {
        setFileList(info.fileList);
    };

    const handlePreview = async () => {
        const image = new Image();
        image.src = userImage;
        const imgWindow = window.open(userImage);
        imgWindow?.document.write(image.outerHTML);
    };

    const uploadButtonMobile = (
        <div className='profile-upload-mobile'>
            Загрузить фото профиля:
            <Button icon={<UploadOutlined />}>Загрузить</Button>
        </div>
    );

    const uploadButton = !isMobile ? (
        <div className='profile-upload'>
            <PlusOutlined style={{ color: '#000' }} />
            <div style={{ marginTop: 8 }}>
                Загрузить фото <br />
                профиля
            </div>
        </div>
    ) : (
        uploadButtonMobile
    );

    useEffect(() => {
        if (userImage) {
            setFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    url: userImage,
                    thumbUrl: userImage,
                },
            ]);
        }
    }, [userImage]);

    return (
        <>
            <div className='profile-upload-image' data-test-id='profile-avatar'>
                <Upload
                    listType={isMobile ? 'picture' : 'picture-card'}
                    fileList={fileList}
                    customRequest={uploadImage}
                    onChange={handleChange}
                    onPreview={handlePreview}
                    maxCount={1}
                    progress={{
                        strokeColor: {
                            '0%': '#f5f5f5',
                            '100%': '#2f54eb',
                        },
                        strokeWidth: 4,
                        showInfo: false,
                        trailColor: '#2f54eb',
                    }}
                    onRemove={() => setError()}
                >
                    {fileList.length < 1 && uploadButton}
                </Upload>
            </div>
            <ProfileErrorModal
                modalProps={{
                    isOpen: isErrorModalOpen,
                    onCloseClick: () => setIsErrorModalOpen(false),
                }}
            />
        </>
    );
};
