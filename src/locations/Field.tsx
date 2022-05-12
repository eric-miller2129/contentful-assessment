import React, { useEffect, useState } from 'react';
import { Button, EntryCard } from '@contentful/f36-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import ImageResource from '../models/ImageResource';
import { DeleteIcon } from '@contentful/f36-icons';

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const [fieldValue, setFieldValue] = useState<ImageResource | null>(sdk.field.getValue());

  useEffect(() => {
    sdk.field.setValue(fieldValue);
  }, [fieldValue, sdk]);

  const openDialog = () => {
    sdk.dialogs.openCurrent({
      width: 1000,
      shouldCloseOnEscapePress: true,
      allowHeightOverflow: true,
      minHeight: 500,
    }).then(
      (data: ImageResource) => {
        setFieldValue(data);
      }
    );
  }

  const removeImage = () => {
    // sdk.field.setValue(null);
    setFieldValue(null);
  }

  return <>
    {
      fieldValue &&
      <>
        <EntryCard
          title={fieldValue.tags}
          style={{ marginTop: '20px', marginBottom: '20px' }}
          thumbnailElement={
            <img alt={fieldValue.tags} src={fieldValue.previewURL} />
          }
        />
        <Button
          variant="negative"
          startIcon={<DeleteIcon />}
          onClick={removeImage}
          data-test-id="remove-image"
        >
            Remove Image
        </Button>
      </>
    }
    {
      !fieldValue &&
      <Button
        onClick={openDialog}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        testId="open-dialog"
      >Open Pixabay</Button>
    }
  </>
};

export default Field;
