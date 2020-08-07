import React, {useState} from 'react';
import axios from "axios";
import {
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiLink,
  EuiSpacer,
  EuiText,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTextArea
} from "@elastic/eui";
import {STAB_TYPE} from './constants/STAB_TYPE';
import {SWITCH_TYPE} from './constants/SWITCH_TYPE';
import {Footer} from './components/Footer';
import {Result} from './components/Result';
import {Download} from './components/Download';
import {SwitchCutoutSelector} from './components/SwitchCutoutSelector';
import {StabCutoutSelector} from './components/StabCutoutSelector';
import {KerfInput} from './components/KerfInput';
import { toast } from 'react-toastify';
import {CASE_TYPE} from './constants/CASE_TYPE';
import {CaseTypeSelector} from './components/CaseTypeSelector';
import {SandwichCaseHoles} from './components/SandwichCaseHoles';
import {CornerRadius} from './components/CornerRadius';
import {SandwichCaseHolesSize} from './components/SandwichCaseHolesSize';
import {SandwichCaseHolesEdge} from './components/SandwichCaseHolesEdge';

export const Kibotin = () => {
  const [kerf, setKerf] = useState(null);
  const [layout, setLayout] = useState("");
  const [stabType, setStabType] = useState(STAB_TYPE.CHERRY_COSTAR.value);
  const [switchType, setSwitchType] = useState(SWITCH_TYPE.CLASSIC_MX.value);
  const [caseType, setCaseType] = useState(CASE_TYPE.CASE_NONE.value);
  const [caseHoles, setCaseHoles] = useState(null);
  const [cornerRadius, setCornerRadius] = useState(null);
  const [caseHoleSize, setCaseHoleSize] = useState(null);
  const [caseHoleEdge, setCaseHoleEdge] = useState(null);
  const [outputId, setOutputId] = useState(null);
  const [removePokerSlots] = useState(false);

  const generate = () => {
    if (!layout) {
      toast.warn('Layout\'s RAW value should not be empty.', {
        position: 'top-center',
        hideProgressBar: true
      });
      return false;
    }
    const payload = {
      layout: window.jsonl.parse('[' + layout + ']'),
      'switch-type': switchType,
      'stab-type': stabType,
      kerf,
      'fillet': cornerRadius
    };

    if (caseType !== CASE_TYPE.CASE_NONE.value) {
      payload['case'] = {
        'case-type': caseType,
        'poker-slots-remove': removePokerSlots,
        'mount-holes-num': caseHoles,
        'mount-holes-size': caseHoleSize,
        'mount-holes-edge': caseHoleEdge
      }
    }

    axios
      .post("https://kibotin.lombokgeeks.xyz/api/generate", payload)
      .then(result => {
        setOutputId(result.data.id)
      })
      .catch(error => {
        console.error(error);
        toast.error("An error occured: " + error, {
          position: 'top-center'
        })
      })
  };

  return (
    <div className="App">
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Kibotin</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentBody>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiForm component="form">
                    <EuiFormRow
                      label="Layout"
                      helpText="Paste the RAW value from http://www.keyboard-layout-editor.com/, Raw Data"
                    >
                      <EuiTextArea
                        name="layout"
                        onChange={(event) => setLayout(event.target.value)}
                      />
                    </EuiFormRow>
                    <EuiFormRow
                      label="Switch type"
                      helpText="http://builder-docs.swillkb.com/features/#switch-type"
                    >
                      <SwitchCutoutSelector switchType={switchType} onChange={value => setSwitchType(value)}/>
                    </EuiFormRow>
                    <EuiFormRow
                      label="Stabilizer type"
                      labelAppend={
                        <EuiText size="xs">
                          <EuiLink href="http://builder-docs.swillkb.com/features/#stabilizer-type">
                            Help
                          </EuiLink>
                        </EuiText>
                      }
                    >
                      <StabCutoutSelector stabType={stabType} onChange={value => setStabType(value)}/>
                    </EuiFormRow>
                    <KerfInput onChange={value => setKerf(value)}/>
                    <CornerRadius onChange={value => setCornerRadius(value)}/>
                    <CaseTypeSelector caseType={caseType} onChange={value => setCaseType(value)} />
                    {caseType === CASE_TYPE.CASE_SANDWICH.value && (
                      <React.Fragment>
                        <SandwichCaseHoles onChange={value => setCaseHoles(value)}/>
                        <SandwichCaseHolesSize onChange={value => setCaseHoleSize(value)}/>
                        <SandwichCaseHolesEdge onChange={value => setCaseHoleEdge(value)}/>
                      </React.Fragment>
                    )}
                    <EuiSpacer />
                    <EuiFormRow>
                      <EuiButton fill onClick={generate}>
                        Generate
                      </EuiButton>
                    </EuiFormRow>
                  </EuiForm>
                </EuiFlexItem>
                <EuiFlexItem>
                  {outputId && outputId.length > 0 ? (
                    <div>
                      <Download outputId={outputId}/>
                      <Result outputId={outputId}/>
                    </div>
                  ) : (
                    <p>Generated SVG will be shown here.</p>
                  )}
                  <EuiSpacer />
                </EuiFlexItem>
              </EuiFlexGroup>
              <Footer/>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  )
};
