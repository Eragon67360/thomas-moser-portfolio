"use client";
import {
  Avatar,
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  Radio,
  RadioGroup,
  TextArea,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { profile } from "@/config/site";
import { BUDGET_OPTIONS, readProjectRequest, toMailto } from "./project-request";

const DESIGNER_URL = "https://portfolio-cristinaandres-projects.vercel.app/";

function Intro({ onContinue }: { onContinue: () => void }) {
  return (
    <>
      <Modal.Body className="flex flex-col items-center justify-center gap-8 px-8 py-16 text-center">
        <Avatar className="size-20">
          <Avatar.Image src="/logos/logo.svg" alt="" />
          <Avatar.Fallback>TM</Avatar.Fallback>
        </Avatar>
        <Modal.Heading className="text-2xl font-bold md:text-4xl">Let&apos;s get started</Modal.Heading>
        <p className="text-sm">
          This form clarifies important questions in advance. Please be as precise as possible, as it saves us both
          time.
        </p>
        <div className="flex w-full flex-col items-center gap-2">
          <Button fullWidth variant="primary" onPress={onContinue}>
            Get started
          </Button>
          <p className="text-xs text-muted">
            Don&apos;t like forms?{" "}
            <a href={`mailto:${profile.Email}`} className="underline">
              Send an email
            </a>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex items-center gap-2 rounded-xl bg-surface-secondary p-3 text-[10px]">
        <IoIosInformationCircleOutline size={20} aria-hidden className="shrink-0" />
        <p>
          I take pure development projects, but also full stack projects with the amazing designer{" "}
          <ExternalLink href={DESIGNER_URL} className="text-indigo-300">
            Cristina Andrés
          </ExternalLink>
        </p>
      </Modal.Footer>
    </>
  );
}

/** Hands the request to the visitor's mail client, addressed to the site owner. */
function submitByEmail(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  window.location.href = toMailto(profile.Email, readProjectRequest(new FormData(event.currentTarget)));
}

function RequestForm() {
  return (
    <Modal.Body>
      <Form onSubmit={submitByEmail} className="flex w-full flex-col gap-6 px-2 py-6">
        <Modal.Heading className="text-xl font-bold">Project request</Modal.Heading>
        <TextField isRequired name="name">
          <Label>Full name</Label>
          <Input placeholder="Steve Jobs" />
          <FieldError />
        </TextField>
        <TextField isRequired name="email" type="email">
          <Label>Email</Label>
          <Input placeholder="steve@apple.com" />
          <FieldError />
        </TextField>
        <div className="flex items-end gap-4">
          <TextField name="position" className="min-w-0 flex-1">
            <Label>Position & Company</Label>
            <Input placeholder="CEO" />
          </TextField>
          <span className="pb-2">at</span>
          <TextField name="company" aria-label="Company" className="min-w-0 flex-1">
            <Input placeholder="Apple" />
          </TextField>
        </div>
        <RadioGroup name="budget">
          <Label>Budget</Label>
          <Description>Estimation of your budget.</Description>
          {BUDGET_OPTIONS.map(({ value, label }) => (
            <Radio key={value} value={value}>
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                {label}
              </Radio.Content>
            </Radio>
          ))}
        </RadioGroup>
        <TextField isRequired name="description">
          <Label>Project description</Label>
          <TextArea
            rows={4}
            placeholder="Tell me more about your project. Please include details like goals, timeline and design links if available."
          />
          <FieldError />
        </TextField>
        <p className="text-xs">
          By submitting this form, you agree to the{" "}
          <Link href="/privacy" target="_blank" className="underline">
            privacy policy
          </Link>
          .
        </p>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Modal.Body>
  );
}

export function ProjectRequestModal() {
  const [step, setStep] = useState<"intro" | "form">("intro");

  return (
    <Modal>
      <Button variant="primary" className="text-sm font-medium sm:text-base md:text-lg lg:text-xl">
        Project request
      </Button>
      <Modal.Backdrop variant="blur" onOpenChange={(isOpen) => !isOpen && setStep("intro")}>
        <Modal.Container scroll="outside">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            {step === "intro" ? <Intro onContinue={() => setStep("form")} /> : <RequestForm />}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
