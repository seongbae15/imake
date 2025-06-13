import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promote-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { Calendar } from "~/common/components/ui/calendar";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "~/common/components/ui/button";
import { DateTime } from "luxon";
import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Promote Product | ProductHunt Clone" },
    { name: "description", content: "Promote your product." },
  ];
};

export default function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState<
    DateRange | undefined
  >();
  const totalDays =
    promotionPeriod?.from && promotionPeriod.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(
          DateTime.fromJSDate(promotionPeriod.from),
          "days"
        ).days
      : 0;
  const widgets = useRef<TossPaymentsWidgets | null>(null);
  useEffect(() => {
    const initToss = async () => {
      const toss = loadTossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm");

      widgets.current = (await toss).widgets({ customerKey: "0000000" });
      await widgets.current.setAmount({
        value: 10000,
        currency: "KRW",
      });
      await widgets.current.renderPaymentMethods({
        selector: "#toss-payment-method",
      });
      await widgets.current.renderAgreement({
        selector: "#toss-payment-agreement",
      });
    };
    initToss();
  }, []);

  useEffect(() => {
    if (widgets.current) {
      widgets.current.setAmount({
        value: totalDays * 20000,
        currency: "KRW",
      });
    }
  }, [promotionPeriod]);
  return (
    <div>
      <Hero
        title="Promote Your Project"
        description="Boost your product's visibility."
      />
      <div className="grid grid-cols-6 gap-10">
        <Form className="col-span-3 mx-auto w-1/2 flex flex-col gap-10 items-start">
          <SelectPair
            label="Select a product"
            description="Select the product you want to promote."
            name="product"
            placeholder="Select a product"
            options={[
              {
                label: "AI Dark Mode Maker",
                value: "ai-dark-mode-maker",
              },
              {
                label: "AI Dark Mode Maker",
                value: "ai-dark-mode-maker-1",
              },
              {
                label: "AI Dark Mode Maker",
                value: "ai-dark-mode-maker-2",
              },
            ]}
          />
          <div className="flex flex-col gap-2 items-center w-full">
            <Label className="flex flex-col gap-1">
              Select a rnage of dates for promotions{" "}
              <small>Minimum duration is 3 days.</small>
            </Label>
            <Calendar
              mode="range"
              selected={promotionPeriod}
              onSelect={setPromotionPeriod}
              min={3}
              disabled={{ before: new Date() }}
            />
          </div>
        </Form>
        <aside className="col-span-3 px-20 flex flex-col items-center">
          <div id="toss-payment-method" className="w-full"></div>
          <div id="toss-payment-agreement"></div>
          <Button disabled={totalDays === 0} className="w-full">
            Checkout (
            {(totalDays * 20000).toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}
            )
          </Button>
        </aside>
      </div>
    </div>
  );
}
