import ImageUploadForm from './ImageUploadForm';
import Portal from './Portal';
import React from 'react';
import useSettingsPanelReposition from '../../hooks/useSettingsPanelReposition';
import {ButtonGroup} from './ButtonGroup';
import {ColorPicker} from './ColorPicker';
import {ReactComponent as DeleteIcon} from '../../assets/icons/kg-trash.svg';
import {Dropdown} from './Dropdown';
import {IconButton} from './IconButton';
import {Input} from './Input';
import {MediaPlaceholder} from './MediaPlaceholder';
import {ProgressBar} from './ProgressBar';
import {Toggle} from './Toggle';
import {openFileSelection} from '../../utils/openFileSelection';

export function SettingsPanel({children, darkMode}) {
    const {ref} = useSettingsPanelReposition();

    return (
        // Block with fixed position and transformed ancestor can be incorrectly positioned https://bugs.chromium.org/p/chromium/issues/detail?id=20574
        // Using Portal to avoid such issue as some cards using transformation
        <Portal>
            <div className={`${darkMode ? 'dark' : ''}`}>
                <div ref={ref}
                    className="not-kg-prose z-[9999999] m-0 flex w-[320px] flex-col gap-2 overflow-y-auto rounded-lg bg-white bg-clip-padding p-6 font-sans shadow dark:bg-grey-900"
                    data-testid="video-settings-panel"
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
}

export function ToggleSetting({label, description, isChecked, onChange, dataTestID}) {
    return (
        <div className="mt-2 flex min-h-[3rem] w-full items-center justify-between text-[1.3rem] first:mt-0">
            <div>
                <div className="font-bold text-grey-900 dark:text-grey-300">{label}</div>
                {description &&
                    <p className="w-11/12 text-[1.25rem] font-normal leading-snug text-grey-700   ">{description}</p>
                }
            </div>
            <div className="flex shrink-0 pl-2">
                <Toggle dataTestID={dataTestID} isChecked={isChecked} onChange={onChange} />
            </div>
        </div>
    );
}

export function InputSetting({label, description, value, placeholder}) {
    return (
        <div className="mt-2 flex w-full flex-col justify-between gap-2 text-[1.3rem] first:mt-0">
            <div className="font-bold text-grey-900">{label}</div>
            <Input placeholder={placeholder} value={value} />
            {description &&
                    <p className="text-[1.25rem] font-normal leading-snug text-grey-700">{description}</p>
            }
        </div>
    );
}

export function DropdownSetting({label, description, trigger, menu}) {
    return (
        <div className="mt-2 flex w-full flex-col justify-between gap-2 text-[1.3rem] first:mt-0">
            <div className="font-bold text-grey-900">{label}</div>
            <Dropdown
                menu={menu}
                trigger={trigger}
            />
            {description &&
                    <p className="text-[1.25rem] font-normal leading-snug text-grey-700">{description}</p>
            }
        </div>
    );
}

export function ButtonGroupSetting({label, onClick, selectedName, buttons}) {
    return (
        <div className="mt-2 flex w-full items-center justify-between text-[1.3rem] first:mt-0">
            <div className="font-bold text-grey-900">{label}</div>

            <div className="shrink-0 pl-2">
                <ButtonGroup buttons={buttons} selectedName={selectedName} onClick={onClick} />
            </div>
        </div>
    );
}

export function ColorPickerSetting({label, onClick, selectedName, buttons, layout, dataTestID}) {
    return (
        <div className={`mt-2 flex w-full text-[1.3rem] first:mt-0 ${layout === 'stacked' ? 'flex-col' : 'items-center justify-between'}`} data-testid={dataTestID}>
            <div className="font-bold text-grey-900 dark:text-grey-300">{label}</div>

            <div className={`shrink-0 ${layout === 'stacked' ? '-mx-1 pt-1' : 'pl-2'}`}>
                <ColorPicker buttons={buttons} selectedName={selectedName} onClick={onClick} />
            </div>
        </div>
    );
}

export function ThumbnailSetting({label, onFileChange, isDraggedOver, placeholderRef, src, alt, isLoading, dataTestID, errors = [], progress, onRemoveCustomThumbnail, icon, desc = '', size, mimeTypes}) {
    const fileInputRef = React.useRef(null);

    const onFileInputRef = (element) => {
        fileInputRef.current = element;
    };

    const progressStyle = {
        width: `${progress?.toFixed(0)}%`
    };

    const onRemove = (e) => {
        e.stopPropagation(); // prevents card from losing selected state
        onRemoveCustomThumbnail();
    };

    const isEmpty = !isLoading && !src;

    return (
        <div className="mt-2 text-[1.3rem] first:mt-0" data-testid="custom-thumbnail">
            <div className="font-bold text-grey-900">{label}</div>

            {isEmpty &&
                <div className="h-32">
                    <MediaPlaceholder
                        borderStyle='dashed'
                        dataTestId="thumbnail-media-placeholder"
                        desc={desc}
                        errorDataTestId="custom-thumbnails-errors"
                        errors={errors}
                        filePicker={() => openFileSelection({fileInputRef})}
                        icon={icon}
                        isDraggedOver={isDraggedOver}
                        placeholderRef={placeholderRef}
                        size={size}
                    />
                    <ImageUploadForm
                        fileInputRef={onFileInputRef}
                        filePicker={() => openFileSelection({fileInputRef})}
                        mimeTypes={mimeTypes}
                        onFileChange={onFileChange}
                    />
                </div>
            }

            {!isEmpty && (
                <div className="group relative flex h-32 items-center justify-center rounded" data-testid="custom-thumbnail-filled">
                    {src && (
                        <>
                            <img alt={alt} className="mx-auto h-full w-full rounded object-cover" src={src} />
                            <div className="absolute inset-0 rounded bg-gradient-to-t from-black/0 via-black/5 to-black/30 opacity-0 transition-all group-hover:opacity-100"></div>
                        </>
                    )}

                    {!isLoading && (
                        <div className="absolute top-2 right-2 flex opacity-0 transition-all group-hover:opacity-100">
                            <IconButton dataTestID={dataTestID} Icon={DeleteIcon} onClick={onRemove} />
                        </div>
                    )}

                    {isLoading && (
                        <div
                            className="absolute inset-0 flex min-w-full items-center justify-center overflow-hidden rounded border border-dashed border-grey/20 bg-grey-50"
                            data-testid="custom-thumbnail-progress"
                        >
                            <ProgressBar style={progressStyle} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function SettingsDivider() {
    return (
        <hr className="-mx-6 mt-2 border-grey-200" />
    );
}
