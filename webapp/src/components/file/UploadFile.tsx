import { FileWithSignedUrl } from '@domaindocs/types';
import { useMutation } from '@tanstack/react-query';
import { filesApi } from '../../state/api/files-api';

type UploadFileProps = {
    domainId: string;
    name: string;
    onUpload: (file: FileWithSignedUrl) => any;
    children: (props: { openUploader: () => any; isUploading: boolean }) => any;
};

export const UploadFile = (props: UploadFileProps) => {
    const { name, domainId, onUpload } = props;

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (file: File) => {
            const fileWithSignedUrl = await filesApi.generateUploadUrl(domainId, {
                type: file.type,
                name: file.name,
            });

            await filesApi.uploadFile(fileWithSignedUrl, file);

            onUpload(fileWithSignedUrl);
        },
    });

    const openUploader = () => {
        const input = document.getElementById(`file-upload-input-${name}`);

        console.log(input);

        if (input) {
            input.click();
        }
    };

    return (
        <form>
            <input
                type={'file'}
                id={`file-upload-input-${name}`}
                hidden={true}
                onChange={async (e) => {
                    const files = e.target.files;
                    if (files) {
                        await mutateAsync(files[0]);
                    }
                }}
            />

            {props.children({
                openUploader,
                isUploading: isPending,
            })}
        </form>
    );
};
